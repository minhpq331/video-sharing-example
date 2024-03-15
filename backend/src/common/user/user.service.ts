import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { TokenPayloadDto } from '../../common/user/dto/token-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(req: LoginDto) {
    const user = await this.userModel.findOne({ email: req.email });
    if (!user || (await user.checkPassword(req.password)) === false) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async register(req: RegisterDto) {
    const user = new this.userModel(req);
    return user.save();
  }

  async generateToken(user: UserDocument) {
    const payload: TokenPayloadDto = { email: user.email, sub: user._id.toHexString() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }
}
