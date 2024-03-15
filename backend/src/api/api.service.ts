import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  healthz(): string {
    return 'Ok';
  }
}
