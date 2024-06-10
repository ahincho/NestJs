import { Test, TestingModule } from '@nestjs/testing';
import { TasksPersistenceService } from './tasks.persistence.service';

describe('TasksPersistenceService', () => {
  let service: TasksPersistenceService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksPersistenceService],
    }).compile();

    service = module.get<TasksPersistenceService>(TasksPersistenceService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
