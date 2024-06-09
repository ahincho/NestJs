import { IsString, MinLength } from "class-validator";

export class TaskRequest {
  @IsString()
  @MinLength(1)
  title: string;
  @IsString()
  @MinLength(1)
  description: string;
}