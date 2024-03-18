import { WorkerNotificationProcessor } from './notification.processor';
import { VideoService } from '../../common/video/video.service';
import { WebsocketEmitter } from '../../common/websocket/websocket.emitter';
import { TestBed } from '@automock/jest';
import { WS_EVENT_VIDEO_SHARED } from '../../common/websocket/websocket.constant';

describe('WorkerNotificationProcessor', () => {
  let processor: WorkerNotificationProcessor;
  let videoService: VideoService;
  let websocketEmitter: WebsocketEmitter;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(WorkerNotificationProcessor).compile();
    processor = unit;
    videoService = unitRef.get(VideoService);
    websocketEmitter = unitRef.get(WebsocketEmitter);
    jest.spyOn(processor['logger'], 'log').mockImplementation(() => {});
    jest.spyOn(processor['logger'], 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onVideoCreatedHandler', () => {
    it('should handle job correctly', async () => {
      const videoId = '123';
      const job: any = {
        id: '1',
        name: 'job_notification_on_video_created',
        data: {
          video_id: videoId,
        },
      };

      jest.spyOn(videoService, 'findById').mockResolvedValueOnce({
        id: videoId,
        title: 'Video title',
        transform: () => ({
          id: videoId,
          title: 'Video title',
        }),
      } as any);

      const emitSpy = jest.spyOn(websocketEmitter, 'emit');

      await processor.onVideoCreatedHandler(job);

      expect(videoService.findById).toHaveBeenCalledWith(videoId);
      expect(emitSpy).toHaveBeenCalledWith(WS_EVENT_VIDEO_SHARED, {
        data: {
          id: videoId,
          title: 'Video title',
        },
      });
    });

    it('should handle errors', async () => {
      const videoId = '123';
      const job: any = {
        id: '1',
        name: 'job_notification_on_video_created',
        data: {
          video_id: videoId,
        },
      };

      jest.spyOn(videoService, 'findById').mockRejectedValueOnce(new Error('Video not found'));

      await expect(processor.onVideoCreatedHandler(job)).rejects.toThrow('Video not found');
    });
  });
});
