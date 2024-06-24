import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
