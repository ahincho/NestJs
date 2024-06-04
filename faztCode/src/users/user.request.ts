import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNumber()
  @Min(1)
  @Max(100)
  age: number;
}