import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { Status } from "../tasks.memory.models";

export class TaskSearchDto {
  @IsOptional()
  @IsIn (
    [ Status.OPEN, Status.OPEN.toLowerCase(),
      Status.IN_PROGRESS, Status.IN_PROGRESS.toLowerCase(), 
      Status.DONE, Status.DONE.toLowerCase() ]
  )
  status: Status;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
