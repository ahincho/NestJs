import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { QueryPipe } from './pipes/query.pipe';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class HelloController {
  @Get('hello')
  public hello(): string {
    return 'Hello world!';
  }
  @Get('not-found')
  @HttpCode(404)  
  public notFound(): string {
    return 'Not found';
  }
  @Get('error')
  @HttpCode(500)
  public error(): string {
    return 'Error';
  }
  @Get('ticket/:ticket')
  public ticket(@Param('ticket', ParseIntPipe) ticket: number): number {
    return ticket + 14;
  }
  @Get('active/:status')
  public status(@Param('status', ParseBoolPipe) status: boolean): boolean {
    console.log(typeof status);
    return status;
  }
  @Get('greeting')
  @UseGuards(AuthGuard)
  public greeting(@Query(QueryPipe) query: { name: string, age: number }): string {
    console.log(`Name: ${typeof query.name}`);
    console.log(`Age: ${typeof query.age}`);
    return `Hello ${query.name} you are ${query.age} years old`;
  }
}
