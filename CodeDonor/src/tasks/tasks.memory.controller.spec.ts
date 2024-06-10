import { Test, TestingModule } from '@nestjs/testing';
import { TasksMemoryController } from './tasks.memory.controller';

describe('TasksMemoryController', () => {
  let controller: TasksMemoryController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksMemoryController],
    }).compile();

    controller = module.get<TasksMemoryController>(TasksMemoryController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
