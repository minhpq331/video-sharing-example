import { TestBed } from '@automock/jest';
import { UserService } from './user.service';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let userService: UserService;
  let userModel: jest.Mocked<Model<User>>;
  let jwtService: jest.Mocked<JwtService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UserService)
      .mock(getModelToken('User'))
      .using(
        jest.fn().mockImplementation(({ email }) => ({
          save: jest.fn().mockResolvedValueOnce({ email }),
        })),
      )
      .compile();

    userService = unit;
    userModel = unitRef.get(getModelToken('User'));
    jwtService = unitRef.get(JwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should be able to login', async () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockedUser = {
      email: loginDto.email,
      checkPassword: jest.fn().mockResolvedValueOnce(true),
    };

    userModel.findOne.mockResolvedValueOnce(mockedUser);

    const user = await userService.login(loginDto);
    expect(user).toBeDefined();
    expect(userModel.findOne).toHaveBeenCalledWith({ email: loginDto.email });
    expect(user.checkPassword).toHaveBeenCalledWith(loginDto.password);
    expect(user).toEqual(mockedUser);
  });

  it('should be able to register', async () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const user = await userService.register(registerDto);
    expect(user).toBeDefined();
    expect(user.email).toEqual(registerDto.email);
  });

  it('should be able to generate token', async () => {
    const mockedUser = {
      _id: new Types.ObjectId(),
      email: 'test@example.com',
    };
    const mockedToken = 'test';
    const mockedPayload = { email: mockedUser.email, sub: mockedUser._id.toHexString() };
    jwtService.signAsync.mockResolvedValueOnce(mockedToken);

    const token = await userService.generateToken(mockedUser as any);

    expect(token).toBeDefined();
    expect(jwtService.signAsync).toHaveBeenCalledWith(mockedPayload);
    expect(token).toEqual({ access_token: mockedToken });
  });

  it('should be able to find one', async () => {
    const mockedUser = {
      _id: new Types.ObjectId(),
      email: 'test@example.com',
    };
    userModel.findById.mockResolvedValueOnce(mockedUser);

    const user = await userService.findOne(mockedUser._id.toHexString());

    expect(user).toBeDefined();
    expect(userModel.findById).toHaveBeenCalledWith(mockedUser._id.toHexString());
    expect(user).toEqual(mockedUser);
  });
});
