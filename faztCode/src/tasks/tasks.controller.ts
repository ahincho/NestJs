import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task";
import { TaskRequest } from "./task.request";
import { TaskUpdateRequest } from "./task.request.update";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }
  @Get()
  public getAll(@Query('title') title: string = ''): Task[] {
    return this.tasksService.getTasks(title);
  }
  @Get(':id')
  public getById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(parseInt(id));
  }
  @Post()
  @UsePipes(new ValidationPipe())
  public createTask(@Body() taskRequest: TaskRequest): Task {
    return this.tasksService.createTask(taskRequest);
  }
  @Put(':id')
  public updateTask(@Param('id') id: string, @Body() body: TaskRequest): void {
    this.tasksService.updateTask(parseInt(id), body);
  }
  @Patch(':id')
  public updateTaskTitle(@Param('id') id: string, @Body() body: TaskUpdateRequest): void {
    this.tasksService.updateTaskTitle(parseInt(id), body.title);
  }
  @Delete(':id')
  public deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(parseInt(id));
  }
}