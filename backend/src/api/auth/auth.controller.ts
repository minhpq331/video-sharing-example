import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { UserService } from 'src/common/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: Record<string, any>) {
    return this.userService.signIn(loginDto.username, loginDto.password);
  }

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
