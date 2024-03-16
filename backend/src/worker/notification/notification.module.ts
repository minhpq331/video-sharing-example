import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { VideoModule } from '../../common/video/video.module';
import { WebsocketModule } from '../../common/websocket/websocket.module';
import { QUEUE_NOTIFICATION } from './notification.constant';
import { WorkerNotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NOTIFICATION,
    }),
    WebsocketModule,
    VideoModule,
  ],
  providers: [WorkerNotificationProcessor],
})
export class WorkerNotificationModule {}
