import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAuthModule } from './auth/auth.module';
import { ApiVideoModule } from './video/video.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from '../common/notification/notification.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: configService.get<string>('redis.uri'),
      }),
    }),

    // Application module
    NotificationModule,
    ApiAuthModule,
    ApiVideoModule,
  ],
  controllers: [ApiController],
})
export class ApiModule {}
