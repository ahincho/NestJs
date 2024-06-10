import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksPersistenceService } from './tasks.persistence.service';
import { TaskEntity } from './persistence/task.entity';
import { TaskCreateDto } from './dtos/task.create.dto';
import { TaskUpdateDto } from './dtos/task.update.dto';

@Controller('/api/v2/tasks')
export class TasksPersistenceController {
  constructor (private readonly tasksPersistenceService: TasksPersistenceService) { }
  @Get()
  public getTasks(): Promise<TaskEntity[]> {
    return this.tasksPersistenceService.getAllTasks();
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
  public updateTaskStatusById(@Param('id', ParseIntPipe) id: number) {
    
  }
  @Delete(':id')
  public deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    
  }
}
