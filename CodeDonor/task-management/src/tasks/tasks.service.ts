import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, Task } from './tasks.models';
import { v4 as uuid } from 'uuid';
import { TaskCreateDto } from './dtos/task.create.dto';
import { TaskSearchDto } from './dtos/task.search.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  public getAllTasks(): Task[] {
    return this.tasks;
  }
  public getTaskWithFilters(taskSearchDto: TaskSearchDto): Task[] {
    const { status, search } = taskSearchDto;
    let tasks = this.tasks;
    if (status) {
      tasks = tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      tasks = tasks.filter(task => task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search));
    }
    return tasks;
  }
  public getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    return task;
  }
  public createTask(taskCreateDto: TaskCreateDto): Task {
    const { title, description } = taskCreateDto;
    const task: Task = {
      id: uuid(), title, description, status: Status.OPEN
    }
    this.tasks.push(task);
    return task;
  }
  public updateTaskStatusById(id: string, status: Status): void {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    this.tasks = this.tasks.map(task => task.id === id ? { ...task, status: status } : task);
  }
  public deleteTaskById(id: string): void {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with the id = ${id} does not exists!`);
    }
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
