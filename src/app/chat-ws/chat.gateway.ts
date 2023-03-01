import {
  OnModuleDestroy,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ConnectedSocket,
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
import { IMessage, IOnline, ITyping } from '../chat/@types/IMessage';
import { ChatService } from '../chat/services/chat.service';
import { ConnectedUsersService } from '../chat/services/connected-users.service';
import { SocketService } from '../chat/services/socket.service';
import { WSGuard } from './guard/ws.guard';

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
        await this.connectedUsersService.addUser(user.userId, client.id);
      }
    } catch (err) {
      this.disconnect(client);
      return;
    }
    console.log('New client connected');
  }

  async handleDisconnect(client: Socket) {
    await this.connectedUsersService.deleteUserWithSocketId(client.id);
    console.log(client.id, 'disconnected');
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

  @UseGuards(WSGuard)
  @SubscribeMessage('addMessage')
  async addMessage(@MessageBody() payload: IMessage, @Request() req) {
    //@ts-ignore
    payload.userID = req.user.userId;
    const socketId = await this.chatService.addMessage(payload);

    this.socketService.server.to(socketId).emit('receiveMessage', payload);
  }

  @UseGuards(WSGuard)
  @SubscribeMessage('onTyping')
  async typingMessage(@MessageBody() payload: ITyping) {
    const socketId = await this.chatService.typingMessage(payload);

    await this.socketService.server.to(socketId).emit('isTyping', payload);
  }

  @UseGuards(WSGuard)
  @SubscribeMessage('online')
  async checkUserOnline(@MessageBody() payload: IOnline, @Request() req) {
    //@ts-ignore
    payload.userId = req.user.userId;
    const { user, checkedUser } = await this.chatService.checkUserOnline(
      payload,
    );

    let isOnline = undefined;
    if (checkedUser) isOnline = true;
    if (user?.socketId) {
      await this.socketService.server
        .to(user.socketId)
        .emit('isOnline', isOnline);
    }
  }
}
