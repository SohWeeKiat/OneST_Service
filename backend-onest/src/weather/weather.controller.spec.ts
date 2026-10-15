import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller.js';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service.js';

describe('WeatherController', () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
      imports: [HttpModule]
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
