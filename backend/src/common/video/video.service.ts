import { Injectable } from '@nestjs/common';
import { TokenPayloadDto } from '../user/dto/token-payload.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schema/video.schema';
import { Model, Types } from 'mongoose';
import * as ytdl from 'ytdl-core';
import { ListVideoDto } from './dto/list-video.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_VIDEO_CREATED } from './video.constant';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(user: TokenPayloadDto, createVideoDto: CreateVideoDto) {
    const videoInfo = await ytdl.getBasicInfo(createVideoDto.url);
    let video = new this.videoModel({
      title: videoInfo.videoDetails.title,
      description: videoInfo.videoDetails.description,
      url: videoInfo.videoDetails.video_url,
      embed_url: videoInfo.videoDetails.embed.iframeUrl,
      thumbnail: videoInfo.videoDetails.thumbnails?.[0]?.url || null,
      author_id: new Types.ObjectId(user.sub),
    });
    video = await video.save();

    this.eventEmitter.emit(EVENT_VIDEO_CREATED, video);

    return video.populate('author');
  }

  async list(query: ListVideoDto) {
    const { page = 1, limit = 10 } = query;
    return this.videoModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author')
      .exec();
  }

  async findById(id: string) {
    return this.videoModel.findById(id).populate('author');
  }
}
