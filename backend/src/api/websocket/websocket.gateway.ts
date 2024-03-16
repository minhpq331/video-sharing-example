import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
@Injectable()
export class ApiWebsocketGateway implements OnGatewayConnection {
  private readonly logger = new Logger(ApiWebsocketGateway.name);
  @WebSocketServer()
  private server: Server;

  handleConnection(socket: Socket): any {
    this.logger.log(`Client ${socket.handshake.headers.origin} is connecting on websocket`);
  }
}
