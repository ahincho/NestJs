import { Module } from '@nestjs/common';
import { TasksMemoryController } from './tasks.memory.controller';
import { TasksMemoryService } from './tasks.memory.service';
import { TasksPersistenceService } from './tasks.persistence.service';
import { TasksPersistenceController } from './tasks.persistence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './persistence/task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  controllers: [TasksMemoryController, TasksPersistenceController],
  providers: [TasksMemoryService, TasksPersistenceService]
})
export class TasksModule {}
