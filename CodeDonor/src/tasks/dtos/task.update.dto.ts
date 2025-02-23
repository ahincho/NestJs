import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Status } from "../tasks.memory.models";

export class TaskUpdateDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsIn([Status.OPEN, Status.IN_PROGRESS, Status.DONE])
  status: Status;
}
