import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private _server: Server;

  set server(server: Server) {
    this._server = server;
  }

  get server() {
    return this._server;
  }
}
