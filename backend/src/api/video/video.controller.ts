import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VideoService } from '../../common/video/video.service';
import { Request } from 'express';
import { CreateVideoDto } from '../../common/video/dto/create-video.dto';
import { ApiAuthGuard } from '../auth/auth.guard';
import { ListVideoDto } from '../../common/video/dto/list-video.dto';

@Controller('videos')
export class ApiVideoController {
  // generate an CRUD API for videos schema using video service
  // and video schema

  constructor(private readonly videoService: VideoService) {}

  // create a new video
  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async create(@Req() req: Request, @Body() createVideoDto: CreateVideoDto) {
    const video = await this.videoService.create(req.user, createVideoDto);
    return video.transform();
  }

  // get videos with pagination
  @UseGuards(ApiAuthGuard)
  @Get('/')
  async list(@Query() query: ListVideoDto) {
    const videos = await this.videoService.list(query);
    return videos.map((video) => video.transform());
  }
}
