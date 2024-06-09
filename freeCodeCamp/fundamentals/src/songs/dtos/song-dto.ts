import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class SongDto {
  @IsString()
  @IsNotEmpty()
  private readonly title: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  private readonly artists: string[];
  @IsNotEmpty()
  @IsDateString()
  private readonly releasedOn: Date;
  @IsNotEmpty()
  @IsMilitaryTime()
  private readonly duration: Date;
}
