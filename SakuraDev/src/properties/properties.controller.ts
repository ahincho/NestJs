import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('properties')
export class PropertiesController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body('property') property: string): string {
    return `Property '${property}' created`;
  }
  @Get()
  findAll(): string {
    return 'Find all properties';
  }
  @Get(':propertyId')
  findById(@Param('propertyId', ParseIntPipe) propertyId: number): string {
    return `Get property with id '${propertyId}'`;
  }
}
