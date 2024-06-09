import { Injectable } from '@nestjs/common';
import { SongDto } from './dtos/song-dto';

@Injectable()
export class SongsService {
  // Local DB - Local Array
  private readonly songs: SongDto[] = [];
  public findAllSongs(): SongDto[] {
    return this.songs;
  }
  public createSong(song: SongDto): SongDto {
    this.songs.push(song);
    return song;
  }
}
