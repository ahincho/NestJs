import { Status } from "../tasks.models";

export class TaskSearchDto {
  status: Status;
  search: string;
}
