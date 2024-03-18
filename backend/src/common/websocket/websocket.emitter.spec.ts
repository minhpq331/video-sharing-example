import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketEmitter } from './websocket.emitter';
import { ConfigService } from '@nestjs/config';

describe('WebsocketEmitter', () => {
  let websocketEmitter: WebsocketEmitter;
  let configService: ConfigService;

  beforeEach(async () => {
    configService = new ConfigService({
      redis: {
        uri: 'redis://localhost:6379',
      },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketEmitter,
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    websocketEmitter = module.get<WebsocketEmitter>(WebsocketEmitter);
  });

  it('should be defined', () => {
    expect(websocketEmitter).toBeDefined();
  });

  it('should initialize emitter', () => {
    const spy = jest.spyOn(websocketEmitter['emitter'], 'emit');
    spy.mockImplementation(() => true);
    expect(spy).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit event', () => {
    const event = 'test';
    const data = { foo: 'bar' };

    const spy = jest.spyOn(websocketEmitter['emitter'], 'emit');
    spy.mockImplementation(() => true);
    websocketEmitter.emit(event, data);

    expect(spy).toHaveBeenCalledWith(event, data);
  });
});
