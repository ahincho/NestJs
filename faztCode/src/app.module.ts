import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [TasksModule, ProjectsModule, UsersModule, AuthModule],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}
