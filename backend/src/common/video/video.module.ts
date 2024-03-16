import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schema/video.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]), UserModule],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
