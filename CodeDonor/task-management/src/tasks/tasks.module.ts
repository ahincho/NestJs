import { Module } from '@nestjs/common';
import { TasksMemoryController } from './tasks.memory.controller';
import { TasksMemoryService } from './tasks.memory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './persistence/task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TasksMemoryController],
  providers: [TasksMemoryService]
})
export class TasksModule {}
