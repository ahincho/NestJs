import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../tasks.memory.models";
import { UserEntity } from "src/auth/persistence/user.entity";

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: Status;
  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
  user: UserEntity
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
