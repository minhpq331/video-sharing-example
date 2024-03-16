import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { NotificationConsumer } from './notification/notification.consumer';

@Module({
  imports: [
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
  ],
  providers: [NotificationConsumer],
})
export class WorkerModule implements OnModuleInit {
  private readonly logger = new Logger(WorkerModule.name);
  onModuleInit() {
    this.logger.log('Worker started with pid: ' + process.pid);
  }
}
