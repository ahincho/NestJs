import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksMemoryService } from './tasks.memory.service';
import { Status, TaskMemory } from './tasks.memory.models';
import { TaskCreateDto } from './dtos/task.create.dto';
import { TaskSearchDto } from './dtos/task.search.dto';
import { StatusPipe } from './pipes/status/status.pipe';
import { SearchPipe } from './pipes/search/search.pipe';

@Controller('api/v1/tasks')
export class TasksMemoryController {
  constructor(private tasksMemoryService: TasksMemoryService) { }
  @Get()
  public getTasks(@Query(ValidationPipe, SearchPipe) taskSearchDto: TaskSearchDto): TaskMemory[] {
    if (Object.keys(taskSearchDto).length) {
      return this.tasksMemoryService.getTaskWithFilters(taskSearchDto);
    } else {
      return this.tasksMemoryService.getAllTasks();
    }
  }
  @Get(':id')
  public getTaskById(@Param('id') id: string): TaskMemory {
    return this.tasksMemoryService.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() taskCreateDto: TaskCreateDto) {
    return this.tasksMemoryService.createTask(taskCreateDto);
  }
  @Patch(':id/status')
  public updateTaskStatus(@Param('id') id: string, @Body('status', StatusPipe) status: Status): void {
    this.tasksMemoryService.updateTaskStatusById(id, status);
  }
  @Delete(':id')
  public deleteTaskById(@Param('id') id: string): void {
    this.tasksMemoryService.deleteTaskById(id);
  }
}
