import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobNotificationOnVideoCreatedDto } from '../../common/notification/dto/job-notification-on-video-created.dto';

@Processor('notification')
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

  @Process('video_created')
  async onVideoCreatedHandler(job: Job<JobNotificationOnVideoCreatedDto>) {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}`);

    // TODO: Send notification to user
    this.logger.log(`Sending notification to user about video ${job.data.video_id} created`);

    this.logger.log(`Job ${job.id} completed`);
    return {};
  }
}
