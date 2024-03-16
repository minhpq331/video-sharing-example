import { Module } from '@nestjs/common';
import { WebsocketEmitter } from './websocket.emitter';

@Module({
  providers: [WebsocketEmitter],
  exports: [WebsocketEmitter],
})
export class WebsocketModule {}
