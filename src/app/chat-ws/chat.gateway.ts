import { OnModuleDestroy, UnauthorizedException } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { ChatService } from '../chat/services/chat.service';
import { ConnectedUsersService } from '../chat/services/connected-users.service';
import { SocketService } from '../chat/services/socket.service';

@WebSocketGateway()
export class ChatGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleDestroy,
    OnGatewayInit
{
  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private connectedUsersService: ConnectedUsersService,
    private chatService: ChatService,
  ) {}
  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  async handleConnection(client: Socket) {
    const authToken = client.handshake?.headers?.authorization || 'abc';
    if (!authToken) {
      this.disconnect(client);
      return;
    }
    try {
      const user = await this.authService.validateUser(authToken);
      if (!user) {
        this.disconnect(client);
        return;
      } else {
        this.connectedUsersService.addUser(user.userId, client.id);
        this.socketService.server.emit('online', {
          userId: user.userId,
          isOnline: true,
        });
      }
    } catch (err) {
      this.disconnect(client);
      return;
    }
    console.log('New client connected');
  }

  async handleDisconnect(client: Socket) {
    await this.connectedUsersService.deleteUserWithSocketId(client.id);
    client.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async onModuleDestroy() {
    await this.connectedUsersService.deleteAllWithInstanceId(
      'so1254meIns412anc2114eId',
    );
    console.log('Module destroyed');
  }

  @SubscribeMessage('addMessage')
  async addMessage(@MessageBody() payload) {
    const socketId = await this.chatService.addMessage(payload);

    this.socketService.server
      .to(socketId)
      .emit('receiveMessage', payload.content, (response) => {
        response({
          received: true,
        });
      });
  }

  @SubscribeMessage('onTyping')
  async typingMessage(@MessageBody() payload) {
    const socketId = await this.chatService.typingMessage(payload);

    this.socketService.server.to(socketId).emit('isTyping', payload);
  }
}
