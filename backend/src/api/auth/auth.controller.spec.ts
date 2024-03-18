import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthController } from './auth.controller';
import { UserService } from '../../common/user/user.service';
import { LoginDto } from '../../common/user/dto/login.dto';
import { RegisterDto } from '../../common/user/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ApiAuthController', () => {
  let controller: ApiAuthController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiAuthController],
      providers: [
        {
          provide: UserService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            generateToken: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ApiAuthController>(ApiAuthController);
    userService = module.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user: any = { id: 1 };

      jest.spyOn(userService, 'login').mockResolvedValue(user);

      const token = { access_token: 'mockToken' };
      jest.spyOn(userService, 'generateToken').mockResolvedValue(token);

      const result = await controller.login(loginDto);

      expect(userService.login).toHaveBeenCalledWith(loginDto);
      expect(userService.generateToken).toHaveBeenCalledWith(user);
      expect(result).toBe(token);
    });
  });

  describe('register', () => {
    it('should return a token on successful registration', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user: any = { id: 1 };

      jest.spyOn(userService, 'register').mockResolvedValue(user);

      const token = { access_token: 'mockToken' };
      jest.spyOn(userService, 'generateToken').mockResolvedValue(token);

      const result = await controller.register(registerDto);

      expect(userService.register).toHaveBeenCalledWith(registerDto);
      expect(userService.generateToken).toHaveBeenCalledWith(user);
      expect(result).toBe(token);
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      const user: any = {
        id: 1,
        transform: jest.fn().mockReturnValue('transformedUser'),
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const req: any = {
        user: {
          sub: '1',
        },
      };

      const result = await controller.getProfile(req);

      expect(userService.findOne).toHaveBeenCalledWith('1');
      expect(user.transform).toHaveBeenCalled();
      expect(result).toBe('transformedUser');
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const req: any = {
        user: {
          sub: '1',
        },
      };

      await expect(controller.getProfile(req)).rejects.toThrow();
    });
  });
});
