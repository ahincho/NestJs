import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongDto } from './dtos/song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) { }
  @Get()
  public findAll(): SongDto[] {
    return this.songsService.findAllSongs();
  }
  @Get(':id')
  public findById() {
    return `Find song by id`;
  }
  @Post()
  public create(@Body() songDto: SongDto): SongDto {
    return this.songsService.createSong(songDto);
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
