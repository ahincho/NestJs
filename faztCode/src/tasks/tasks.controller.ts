import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task";
import { TaskRequest } from "./task.request";
import { TaskUpdateRequest } from "./task.request.update";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }
  @ApiTags('tasks')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  @ApiResponse({ status: 403, description: 'Fordibben' })
  @Get()
  public getAll(@Query('title') title: string = ''): Task[] {
    return this.tasksService.getTasks(title);
  }
  @ApiTags('tasks')
  @Get(':id')
  public getById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(parseInt(id));
  }
  @ApiTags('tasks')
  @ApiOperation({ summary: 'Create a task' })
  @Post()
  public createTask(@Body() taskRequest: TaskRequest): Task {
    return this.tasksService.createTask(taskRequest);
  }
  @ApiTags('tasks')
  @Put(':id')
  public updateTask(@Param('id') id: string, @Body() body: TaskRequest): void {
    this.tasksService.updateTask(parseInt(id), body);
  }
  @ApiTags('tasks')
  @Patch(':id')
  public updateTaskTitle(@Param('id') id: string, @Body() body: TaskUpdateRequest): void {
    this.tasksService.updateTaskTitle(parseInt(id), body.title);
  }
  @ApiTags('tasks')
  @Delete(':id')
  public deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(parseInt(id));
  }
}