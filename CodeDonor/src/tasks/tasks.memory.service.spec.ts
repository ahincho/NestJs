import { Test, TestingModule } from '@nestjs/testing';
import { TasksMemoryService } from './tasks.memory.service';

describe('TasksService', () => {
  let service: TasksMemoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksMemoryService],
    }).compile();

    service = module.get<TasksMemoryService>(TasksMemoryService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
