import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  getTest() {
    return 'hi';
  }
}
