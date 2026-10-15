import { Test, TestingModule } from '@nestjs/testing';
import { UenServiceController } from './uen-service.controller.js';

describe('UenServiceController', () => {
  let controller: UenServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UenServiceController],
    }).compile();

    controller = module.get<UenServiceController>(UenServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
