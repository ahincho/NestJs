import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../tasks.memory.models";

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: Status;
}
