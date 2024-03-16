import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Emitter } from '@socket.io/redis-emitter';
import { Redis } from 'ioredis';

@Injectable()
export class WebsocketEmitter {
  private emitter: Emitter;
  constructor(configService: ConfigService) {
    this.emitter = new Emitter(new Redis(configService.getOrThrow<string>('redis.uri')));
  }

  emit(event: string, data: any) {
    this.emitter.emit(event, data);
  }
}
