import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('/api/v2/tasks')
export class TasksPersistenceController {
  @Get()
  public getTasks() {

  }
  @Get(':id')
  public getTaskById(@Param('id', ParseIntPipe) id: number) {

  }
  @Post()
  public createTask(@Body() task) {

  }
  @Patch(':id/status')
  public updateTaskStatusById(@Param('id', ParseIntPipe) id: number) {

  }
  @Delete(':id')
  public deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    
  }
}
