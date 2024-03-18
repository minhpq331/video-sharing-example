import { TestBed } from '@automock/jest';
import { NotificationEventHandler } from './notification.event-handler';
import { Queue } from 'bull';
import { VideoDocument } from '../video/schema/video.schema';
import { getQueueToken } from '@nestjs/bull';
import { JOB_NOTIFICATION_ON_VIDEO_CREATED, QUEUE_NOTIFICATION } from '../../worker/notification/notification.constant';
import { Types } from 'mongoose';

describe('NotificationEventHandler', () => {
  let notificationEventHandler: NotificationEventHandler;
  let notificationQueue: jest.Mocked<Queue>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(NotificationEventHandler)
      .mock(getQueueToken(QUEUE_NOTIFICATION))
      .using({ add: jest.fn() })
      .compile();

    notificationEventHandler = unit;
    notificationQueue = unitRef.get(getQueueToken(QUEUE_NOTIFICATION));
  });

  it('should be defined', () => {
    expect(notificationEventHandler).toBeDefined();
  });

  describe('handleVideoCreatedEvent', () => {
    it('should add a job to the notification queue', async () => {
      // Arrange
      const video: VideoDocument = { _id: new Types.ObjectId() } as any; // Mocked VideoDocument
      notificationQueue.add.mockResolvedValueOnce(null as any); // Mock add method
      const logSpy = jest.spyOn(notificationEventHandler['logger'], 'log');
      logSpy.mockImplementation(() => null);

      // Act
      await notificationEventHandler.handleVideoCreatedEvent(video);

      // Assert
      expect(notificationQueue.add).toHaveBeenCalledWith(JOB_NOTIFICATION_ON_VIDEO_CREATED, {
        video_id: video._id.toHexString(),
      });
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const video: VideoDocument = { _id: new Types.ObjectId() } as any; // Mocked VideoDocument
      const error = new Error('Error adding job to queue');
      notificationQueue.add.mockRejectedValueOnce(error); // Mock rejection
      const errorSpy = jest.spyOn(notificationEventHandler['logger'], 'error');
      errorSpy.mockImplementation(() => null);

      // Act
      await notificationEventHandler.handleVideoCreatedEvent(video);

      // Assert
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
