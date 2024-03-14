import { Module } from '@nestjs/common';
import { UserModule } from 'src/common/user/user.module';
import { ApiAuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [ApiAuthController],
  providers: [],
})
export class ApiAuthModule {}
