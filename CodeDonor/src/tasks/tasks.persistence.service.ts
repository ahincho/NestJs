import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './persistence/task.entity';
import { Like, Repository } from 'typeorm';
import { TaskCreateDto } from './dtos/task.create.dto';
import { Status } from './tasks.memory.models';
import { TaskUpdateDto } from './dtos/task.update.dto';
import { TaskSearchDto } from './dtos/task.search.dto';

@Injectable()
export class TasksPersistenceService {
  constructor (
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) { }
  public async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }
  public async getTasksWithFilters(taskSearchDto: TaskSearchDto): Promise<TaskEntity[]> {
    const { status, search } = taskSearchDto;
    const conditions: any = {};
    if (status) {
      conditions.status = status;
    }
    if (search) {
      conditions.title = Like(`%${search}%`);
    }
    return this.taskRepository.findBy(conditions);
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
  public async updateTaskStatusById(id: number, status: Status): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    task.status = status;
    await this.taskRepository.update(id, task);
  }
  public async deleteTaskById(id: number): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    await this.taskRepository.delete({ id });
  }
}
