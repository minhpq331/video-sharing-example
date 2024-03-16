import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_NOTIFICATION } from './notification.constant';
import { WorkerNotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NOTIFICATION,
    }),
  ],
  providers: [WorkerNotificationProcessor],
})
export class WorkerNotificationModule {}
