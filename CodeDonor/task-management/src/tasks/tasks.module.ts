import { Module } from '@nestjs/common';
import { TasksMemoryController } from './tasks.memory.controller';
import { TasksMemoryService } from './tasks.memory.service';
import { TasksPersistenceService } from './tasks.persistence.service';
import { TasksPersistenceController } from './tasks.persistence.controller';

@Module({
  controllers: [TasksMemoryController, TasksPersistenceController],
  providers: [TasksMemoryService, TasksPersistenceService]
})
export class TasksModule {}
