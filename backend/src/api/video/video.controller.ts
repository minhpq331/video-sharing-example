import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { VideoService } from '../../common/video/video.service';
import { Request } from 'express';
import { CreateVideoDto } from '../../common/video/dto/create-video.dto';
import { ApiAuthGuard } from '../auth/auth.guard';

@Controller('videos')
export class ApiVideoController {
  // generate an CRUD API for videos schema using video service
  // and video schema

  constructor(private readonly videoService: VideoService) {}

  // create a new video
  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async register(@Req() req: Request, @Body() createVideoDto: CreateVideoDto) {
    return await this.videoService.create(req.user, createVideoDto);
  }
}
