import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './persistence/task.entity';
import { Like, Repository } from 'typeorm';
import { TaskCreateDto } from './dtos/task.create.dto';
import { Status } from './tasks.memory.models';
import { TaskUpdateDto } from './dtos/task.update.dto';
import { TaskSearchDto } from './dtos/task.search.dto';
import { UserEntity } from 'src/auth/persistence/user.entity';

@Injectable()
export class TasksPersistenceService {
  private logger = new Logger('TaskPersistenceService');
  constructor (
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) { }
  public async getAllTasks(userEntity: UserEntity): Promise<TaskEntity[]> {
    return this.taskRepository.findBy({ user: userEntity });
  }
  public async getTasksWithFilters(taskSearchDto: TaskSearchDto, userEntity: UserEntity): Promise<TaskEntity[]> {
    const { status, search } = taskSearchDto;
    const conditions: any = { user: userEntity };
    if (status) {
      conditions.status = status;
    }
    if (search) {
      conditions.title = Like(`%${search}%`);
    }
    return this.taskRepository.findBy(conditions);
  }
  public async getTaskById(id: number, userEntity: UserEntity): Promise<TaskEntity> {
    const task = await this.taskRepository.findOneBy({ id, user: userEntity });
    if (!task) {
      this.logger.error(`Task with taskId=${id} does not exists`);
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    return task;
  }
  public async createTask(taskCreateDto: TaskCreateDto, userEntity: UserEntity): Promise<TaskEntity> {
    const { title, description } = taskCreateDto;
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = Status.OPEN;
    task.user = userEntity;
    await task.save();
    delete task.user;
    return task;
  }
  public async updateTaskById(id: number, taskUpdateDto: TaskUpdateDto, userEntity: UserEntity): Promise<void> {
    const { title, description, status } = taskUpdateDto;
    const task = await this.taskRepository.findOneBy({ id, user: userEntity });
    if (!task) {
      this.logger.error(`Task with the taskId=${id} does not exists`);
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    task.title = title;
    task.description = description;
    task.status = status;
    await this.taskRepository.update(id, task);
  }
  public async updateTaskStatusById(id: number, status: Status, userEntity: UserEntity): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id, user: userEntity });
    if (!task) {
      this.logger.error(`Task with the taskId=${id} does not exists`);
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    task.status = status;
    await this.taskRepository.update(id, task);
  }
  public async deleteTaskById(id: number, userEntity: UserEntity): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id, user: userEntity });
    if (!task) {
      this.logger.error(`Task with the taskId=${id} does not exists`);
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    await this.taskRepository.delete({ id });
  }
}
