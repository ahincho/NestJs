import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Status, Task } from './tasks.models';
import { TaskCreateDto } from './dtos/task.create.dto';
import { TaskSearchDto } from './dtos/task.search.dto';

@Controller('api/v1/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }
  @Get()
  public getTasks(@Query() taskSearchDto: TaskSearchDto): Task[] {
    if (Object.keys(taskSearchDto).length) {
      return this.tasksService.getTaskWithFilters(taskSearchDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  @Get(':id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() taskCreateDto: TaskCreateDto) {
    return this.tasksService.createTask(taskCreateDto);
  }
  @Patch(':id/status')
  public updateTaskStatus(@Param('id') id: string, @Body('status') status: Status): void {
    this.tasksService.updateTaskStatusById(id, status);
  }
  @Delete(':id')
  public deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }
}
