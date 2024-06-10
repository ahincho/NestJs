import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './persistence/task.entity';
import { Repository } from 'typeorm';
import { TaskCreateDto } from './dtos/task.create.dto';
import { Status } from './tasks.memory.models';
import { TaskUpdateDto } from './dtos/task.update.dto';

@Injectable()
export class TasksPersistenceService {
  constructor (
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) { }
  public async getAllTasks() {
    return this.taskRepository.find();
  }
  public async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    return task;
  }
  public async createTask(taskCreateDto: TaskCreateDto): Promise<TaskEntity> {
    const { title, description } = taskCreateDto;
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = Status.OPEN;
    await task.save();
    return task;
  }
  public async updateTaskById(id: number, taskUpdateDto: TaskUpdateDto): Promise<void> {
    const { title, description, status } = taskUpdateDto;
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    task.title = title;
    task.description = description;
    task.status = status;
    await this.taskRepository.update(id, task);
  }
}
