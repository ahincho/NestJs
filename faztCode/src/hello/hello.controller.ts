import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  public greeting(): string {
    return 'Hello world!';
  }
}
