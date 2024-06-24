import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksPersistenceService } from './tasks.persistence.service';
import { TaskEntity } from './persistence/task.entity';
import { TaskCreateDto } from './dtos/task.create.dto';
import { TaskUpdateDto } from './dtos/task.update.dto';
import { Status } from './tasks.memory.models';
import { StatusPipe } from './pipes/status/status.pipe';
import { TaskSearchDto } from './dtos/task.search.dto';
import { SearchPipe } from './pipes/search/search.pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/persistence/user.entity';
import { GetUser } from 'src/auth/decorators/get.user.decorator';

@Controller('/api/v2/tasks')
@UseGuards(AuthGuard())
export class TasksPersistenceController {
  private logger = new Logger('TaskController');
  constructor (private readonly tasksPersistenceService: TasksPersistenceService) { }
  @Get()
  public getTasks(
    @Query(ValidationPipe, SearchPipe) taskSearchDto: TaskSearchDto,
    @GetUser() userEntity: UserEntity
  ): Promise<TaskEntity[]> {
    this.logger.verbose(`${userEntity.username} (userId=${userEntity.id}) retrieving all tasks with filters ${JSON.stringify(taskSearchDto)}`);
    if (Object.keys(taskSearchDto).length) {
      return this.tasksPersistenceService.getTasksWithFilters(taskSearchDto, userEntity);
    } else {
      return this.tasksPersistenceService.getAllTasks(userEntity);
    }
  }
  @Get(':id')
  public getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() userEntity: UserEntity
  ): Promise<TaskEntity> {
    this.logger.verbose(`${userEntity.username} (userId=${userEntity.id}) retrieving task with taskId=${id}`);
    return this.tasksPersistenceService.getTaskById(id, userEntity);
  }
  @Post()
  @UsePipes(ValidationPipe)
  public createTask(
    @Body() taskCreateDto: TaskCreateDto,
    @GetUser() userEntity: UserEntity
  ): Promise<TaskEntity> {
    this.logger.verbose(`${userEntity.username} (userId=${userEntity.id}) creating a task with the following data ${JSON.stringify(taskCreateDto)}`);
    return this.tasksPersistenceService.createTask(taskCreateDto, userEntity);
  }
  @Put(':id')
  @UsePipes(ValidationPipe)
  public updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskUpdateDto: TaskUpdateDto,
    @GetUser() userEntity: UserEntity
  ): void {
    this.logger.verbose(`${userEntity.username} (userId=${userEntity.id}) updating task with taskId=${id} with the following data ${JSON.stringify(taskUpdateDto)}`);
    this.tasksPersistenceService.updateTaskById(id, taskUpdateDto, userEntity);
  }
  @Patch(':id/status')
  public updateTaskStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StatusPipe) status: Status,
    @GetUser() userEntity: UserEntity
  ) {
    this.logger.verbose(`${userEntity.username} (userId=${userEntity.id}) updating task with taskId=${id} with the following status ${JSON.stringify(status)}`);
    this.tasksPersistenceService.updateTaskStatusById(id, status, userEntity);
  }
  @Delete(':id')
  public deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() userEntity: UserEntity
  ) {
    this.logger.verbose(`${userEntity.username} (userId=${userEntity.id}) deleting task with taskId=${id}`);
    this.tasksPersistenceService.deleteTaskById(id, userEntity);
  }
}
