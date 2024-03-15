import { TokenPayloadDto } from '../src/common/user/dto/token-payload.dto';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayloadDto;
    }
  }
}

export {};
