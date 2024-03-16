import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { JOB_NOTIFICATION_ON_VIDEO_CREATED, QUEUE_NOTIFICATION } from '../../worker/notification/notification.constant';
import { VideoDocument } from '../video/schema/video.schema';
import { EVENT_VIDEO_CREATED } from '../video/video.constant';
import { JobNotificationOnVideoCreatedDto } from './dto/job-notification-on-video-created.dto';

@Injectable()
export class NotificationEventHandler {
  private readonly logger = new Logger(NotificationEventHandler.name);

  constructor(@InjectQueue(QUEUE_NOTIFICATION) private notificationQueue: Queue) {}

  @OnEvent(EVENT_VIDEO_CREATED, { async: true })
  async handleVideoCreatedEvent(video: VideoDocument) {
    try {
      this.logger.log(`Handle ${EVENT_VIDEO_CREATED} event: ${video._id}`);
      await (this.notificationQueue as Queue<JobNotificationOnVideoCreatedDto>).add(JOB_NOTIFICATION_ON_VIDEO_CREATED, {
        video_id: video._id.toHexString(),
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
