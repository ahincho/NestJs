import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksPersistenceService } from './tasks.persistence.service';
import { TaskEntity } from './persistence/task.entity';
import { TaskCreateDto } from './dtos/task.create.dto';
import { TaskUpdateDto } from './dtos/task.update.dto';
import { Status } from './tasks.memory.models';
import { StatusPipe } from './pipes/status/status.pipe';
import { TaskSearchDto } from './dtos/task.search.dto';
import { SearchPipe } from './pipes/search/search.pipe';

@Controller('/api/v2/tasks')
export class TasksPersistenceController {
  constructor (private readonly tasksPersistenceService: TasksPersistenceService) { }
  @Get()
  public getTasks(@Query(ValidationPipe, SearchPipe) taskSearchDto: TaskSearchDto): Promise<TaskEntity[]> {
    if (Object.keys(taskSearchDto).length) {
      return this.tasksPersistenceService.getTasksWithFilters(taskSearchDto);
    } else {
      return this.tasksPersistenceService.getAllTasks();
    }
  }
  @Get(':id')
  public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksPersistenceService.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() taskCreateDto: TaskCreateDto): Promise<TaskEntity> {
    return this.tasksPersistenceService.createTask(taskCreateDto);
  }
  @Put(':id')
  @UsePipes(ValidationPipe)
  public updateTaskById(@Param('id', ParseIntPipe) id: number, @Body() taskUpdateDto: TaskUpdateDto): void {
    this.tasksPersistenceService.updateTaskById(id, taskUpdateDto);
  }
  @Patch(':id/status')
  public updateTaskStatusById(@Param('id', ParseIntPipe) id: number, @Body('status', StatusPipe) status: Status) {
    this.tasksPersistenceService.updateTaskStatusById(id, status);
  }
  @Delete(':id')
  public deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    this.tasksPersistenceService.deleteTaskById(id);
  }
}
