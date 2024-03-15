import { Module } from '@nestjs/common';
import { ApiAuthController } from './auth.controller';
import { UserModule } from 'src/common/user/user.module';
import { ApiAuthGuard } from './auth.guard';

@Module({
  imports: [UserModule],
  providers: [ApiAuthGuard],
  controllers: [ApiAuthController],
})
export class ApiAuthModule {}
