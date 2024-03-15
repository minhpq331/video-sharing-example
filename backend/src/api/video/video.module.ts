import { Module } from '@nestjs/common';
import { ApiVideoController } from './video.controller';
import { VideoModule } from '../../common/video/video.module';
import { ApiAuthModule } from '../auth/auth.module';
import { UserModule } from '../../common/user/user.module';

@Module({
  imports: [UserModule, VideoModule, ApiAuthModule],
  controllers: [ApiVideoController],
})
export class ApiVideoModule {}
