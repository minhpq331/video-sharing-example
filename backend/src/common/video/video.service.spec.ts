import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from './schema/video.schema';
import { Model, Types } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as ytdl from 'ytdl-core';
import { EVENT_VIDEO_CREATED } from './video.constant';

jest.mock('ytdl-core');

describe('VideoService', () => {
  let videoService: VideoService;
  let videoModel: any;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useFactory: () => {
            const mockVideoModel = function () {};
            mockVideoModel.prototype.save = jest.fn();
            mockVideoModel.prototype.populate = jest.fn();
            mockVideoModel.find = jest.fn();
            mockVideoModel.findById = jest.fn();
            return mockVideoModel;
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
    videoModel = module.get<Model<Video>>(getModelToken(Video.name));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a video successfully', async () => {
    const user = { sub: new Types.ObjectId() };
    const createVideoDto = { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' };
    const videoDetails = {
      videoDetails: {
        title: 'Test Title',
        description: 'Test Description',
        video_url: createVideoDto.url,
        embed: { iframeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        thumbnails: [{ url: 'https://example.com/thumbnail.jpg' }],
      },
    };

    (ytdl.getBasicInfo as any).mockResolvedValue(videoDetails as any);

    videoModel.prototype.save.mockReturnThis();
    videoModel.prototype.populate.mockResolvedValue(videoDetails.videoDetails);

    const result = await videoService.create(user as any, createVideoDto);

    expect(ytdl.getBasicInfo).toHaveBeenCalledWith(createVideoDto.url);
    expect(eventEmitter.emit).toHaveBeenCalledWith(EVENT_VIDEO_CREATED, expect.any(Object));
    expect(result).toEqual(videoDetails.videoDetails);
  });

  it('should list videos', async () => {
    const query = { page: 1, limit: 10 };
    const videoList = [{ title: 'Video 1' }, { title: 'Video 2' }];

    videoModel.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(videoList),
    });

    const result = await videoService.list(query);

    expect(videoModel.find).toHaveBeenCalled();
    expect(result).toEqual(videoList);
  });

  it('should find video by ID', async () => {
    const videoId = 'someVideoId';
    const video = { title: 'Video Title' };

    videoModel.findById.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(video),
    });

    const result = await videoService.findById(videoId);

    expect(videoModel.findById).toHaveBeenCalledWith(videoId);
    expect(result).toEqual(video);
  });
});
