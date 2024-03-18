import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { ConfigService } from '@nestjs/config';
import { RedisIoAdapter } from './common/websocket/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.enableCors({
    preflightContinue: false,
    origin: true,
    methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  const configService = await app.resolve(ConfigService);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis(configService.getOrThrow<string>('redis.uri'));
  app.useWebSocketAdapter(redisIoAdapter);

  const port = await configService.getOrThrow<number>('port', { infer: true });
  await app.listen(port);
}
bootstrap();
