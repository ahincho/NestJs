export interface TaskMemory {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE'
}
