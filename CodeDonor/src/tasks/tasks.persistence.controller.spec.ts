import { Test, TestingModule } from '@nestjs/testing';
import { TasksPersistenceController } from './tasks.persistence.controller';

describe('TasksPersistenceController', () => {
  let controller: TasksPersistenceController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksPersistenceController],
    }).compile();
    controller = module.get<TasksPersistenceController>(TasksPersistenceController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
