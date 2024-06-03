import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task";
import { TaskRequest } from "./task.request";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  public getTasks(title: string): Task[] {
    return this.tasks.filter(task => task.title.toLowerCase().includes(title));
  }
  public getTaskById(id: number): Task {
    if (id > 0 && id <= this.tasks.length) {
      return this.tasks.find(task => task.id === id);
    } else {
      console.log(`Task with id ${id} not found!`);
    }
  }
  public createTask(taskRequest: TaskRequest): Task {
    let task = new Task(this.tasks.length + 1, taskRequest.title, taskRequest.description);
    this.tasks.push(task);
    return task;
  }
  public updateTask(id: number, taskRequest: TaskRequest): void {
    if (this.tasks.find(task => task.id === id)) {
      this.tasks[id - 1] = new Task(id, taskRequest.title, taskRequest.description);
    } else {
      console.log(`Task with id ${id} not found!`);
    }
  }
  public updateTaskTitle(id: number, title: string): void {
    if (this.tasks.find(task => task.id === id)) {
      this.tasks[id - 1] = new Task(id, title, this.tasks[id - 1].description);
    } else {
      console.log(`Task with id ${id} not found!`);
    }
  }
  public deleteTaskById(id: number): void {
    if (this.tasks.find(task => task.id === id)) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    } else {
      console.log(`Task with id ${id} not found!`);
    }
  }
}
