import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { TokenPayloadDto } from 'src/common/user/dto/token-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: TokenPayloadDto = { email: user.email, sub: user._id.toHexString() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(id: string) {
    return { id };
  }
}
