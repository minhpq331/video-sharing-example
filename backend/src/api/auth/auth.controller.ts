import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from 'src/common/user/dto/login.dto';
import { UserService } from 'src/common/user/user.service';
import { ApiAuthGuard } from './auth.guard';

@Controller('auth')
export class ApiAuthController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(ApiAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    return this.userService.findOne(req?.user?.sub as string);
  }
}
