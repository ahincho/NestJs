import { TaskEntity } from "src/tasks/persistence/task.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @OneToMany(type => TaskEntity, task => task.user, { eager: false })
  tasks: TaskEntity[];
  @Column()
  salt: string;
}
