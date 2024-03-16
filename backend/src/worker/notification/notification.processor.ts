import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobNotificationOnVideoCreatedDto } from '../../common/notification/dto/job-notification-on-video-created.dto';
import { JOB_NOTIFICATION_ON_VIDEO_CREATED, QUEUE_NOTIFICATION } from './notification.constant';

@Processor(QUEUE_NOTIFICATION)
export class WorkerNotificationProcessor {
  private readonly logger = new Logger(WorkerNotificationProcessor.name);

  @Process(JOB_NOTIFICATION_ON_VIDEO_CREATED)
  async onVideoCreatedHandler(job: Job<JobNotificationOnVideoCreatedDto>) {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

    // TODO: Send notification to user
    this.logger.log(`Sending notification to user about video ${job.data.video_id} created`);

    this.logger.log(`Job ${job.id} completed`);
    return {};
  }
}
