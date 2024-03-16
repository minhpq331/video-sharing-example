import { Injectable } from '@nestjs/common';
import { TokenPayloadDto } from '../user/dto/token-payload.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schema/video.schema';
import { Model } from 'mongoose';
import * as ytdl from 'ytdl-core';
import { ListVideoDto } from './dto/list-video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>) {}

  async create(user: TokenPayloadDto, createVideoDto: CreateVideoDto) {
    const videoInfo = await ytdl.getBasicInfo(createVideoDto.url);
    const video = new this.videoModel({
      title: videoInfo.videoDetails.title,
      description: videoInfo.videoDetails.description,
      url: videoInfo.videoDetails.video_url,
      embed_url: videoInfo.videoDetails.embed.iframeUrl,
      thumbnail: videoInfo.videoDetails.thumbnails?.[0]?.url || null,
      author_id: user.sub,
    });
    return video.save();
  }

  async list(query: ListVideoDto) {
    const { page = 1, limit = 10 } = query;
    return this.videoModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
}
