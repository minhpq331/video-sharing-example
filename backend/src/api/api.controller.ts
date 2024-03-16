import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  constructor() {}

  @Get()
  healthz(): string {
    return 'Ok';
  }
}
