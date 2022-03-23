import { OnModuleDestroy, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
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
    console.log('Module destroyed');
  }
}
