import { Test, TestingModule } from '@nestjs/testing';
import { ApiVideoController } from './video.controller';
import { VideoService } from '../../common/video/video.service';
import { CreateVideoDto } from '../../common/video/dto/create-video.dto';
import { ListVideoDto } from '../../common/video/dto/list-video.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ApiVideoController', () => {
  let controller: ApiVideoController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiVideoController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            create: jest.fn(),
            list: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ApiVideoController>(ApiVideoController);
    service = module.get<VideoService>(VideoService);
  });

  it('should create a video', async () => {
    const createDto: CreateVideoDto = {
      url: 'https://example.com/video.mp4',
    };
    const user = { sub: '123' };
    const video = { _id: '1', title: 'Video 1', transform: jest.fn() };

    service.create.mockResolvedValueOnce(video);

    await controller.create({ user } as any, createDto);

    expect(service.create).toHaveBeenCalledWith(user, createDto);
    expect(video.transform).toHaveBeenCalled();
  });

  it('should get a list of videos', async () => {
    const query: ListVideoDto = {
      limit: 10,
      page: 1,
    };
    const videos = [{ id: '1', title: 'Video 1', transform: jest.fn() }];

    service.list.mockResolvedValueOnce(videos);

    await controller.list(query);

    expect(service.list).toHaveBeenCalledWith(query);
    expect(videos[0].transform).toHaveBeenCalled();
  });
});
