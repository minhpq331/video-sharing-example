import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.enableCors();

  const port = await (await app.resolve(ConfigService)).getOrThrow<number>('port', { infer: true });
  await app.listen(port);
}
bootstrap();
