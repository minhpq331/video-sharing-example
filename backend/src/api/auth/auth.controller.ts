import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from 'src/common/user/dto/login.dto';
import { UserService } from 'src/common/user/user.service';
import { RegisterDto } from 'src/common/user/dto/register.dto';
import { ApiAuthGuard } from './auth.guard';

@Controller('auth')
export class ApiAuthController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.login(loginDto);
    return this.userService.generateToken(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.register(registerDto);
    return this.userService.generateToken(user);
  }

  @UseGuards(ApiAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    const user = await this.userService.findOne(req?.user?.sub as string);
    if (!user) {
      throw new InternalServerErrorException();
    }
    return {
      id: user._id.toHexString(),
      email: user.email,
    };
  }
}
