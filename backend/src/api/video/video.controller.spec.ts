import { Test, TestingModule } from '@nestjs/testing';
import { ApiVideoController } from './video.controller';

describe('ApiVideoController', () => {
  let controller: ApiVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiVideoController],
    }).compile();

    controller = module.get<ApiVideoController>(ApiVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
