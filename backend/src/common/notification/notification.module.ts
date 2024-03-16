import { Module } from '@nestjs/common';
import { NotificationEventHandler } from './notification.event-handler';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NOTIFICATION } from '../../worker/notification/notification.constant';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NOTIFICATION,
    }),
  ],
  providers: [NotificationEventHandler],
})
export class NotificationModule {}
