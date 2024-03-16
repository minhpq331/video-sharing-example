import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobNotificationOnVideoCreatedDto } from '../../common/notification/dto/job-notification-on-video-created.dto';
import { VideoService } from '../../common/video/video.service';
import { WS_EVENT_VIDEO_SHARED } from '../../common/websocket/websocket.constant';
import { WebsocketEmitter } from '../../common/websocket/websocket.emitter';
import { JOB_NOTIFICATION_ON_VIDEO_CREATED, QUEUE_NOTIFICATION } from './notification.constant';

@Processor(QUEUE_NOTIFICATION)
export class WorkerNotificationProcessor {
  private readonly logger = new Logger(WorkerNotificationProcessor.name);

  constructor(
    private readonly websocketEmitter: WebsocketEmitter,
    private readonly videoService: VideoService,
  ) {}

  @Process(JOB_NOTIFICATION_ON_VIDEO_CREATED)
  async onVideoCreatedHandler(job: Job<JobNotificationOnVideoCreatedDto>) {
    try {
      this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

      // TODO: Send notification to user
      this.logger.log(`Sending notification to user about video ${job.data.video_id} created`);
      const video = await this.videoService.findById(job.data.video_id);
      this.websocketEmitter.emit(WS_EVENT_VIDEO_SHARED, { data: video?.transform() });

      this.logger.log(`Job ${job.id} completed`);
      return {};
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
