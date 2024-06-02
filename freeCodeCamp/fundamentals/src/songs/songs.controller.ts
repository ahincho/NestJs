import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  public findAll(): string {
    return 'Find all songs';
  }
  @Get(':id')
  public findById() {
    return `Find song by id`;
  }
  @Post()
  public create() {
    return 'Create a song';
  }
  @Patch(':id')
  public updateById() {
    return 'Update a song by id';
  }
  @Delete(':id')
  public deleteById() {
    return 'Delete a song by id';
  }
}
