import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service.js';
import { HttpModule } from '@nestjs/axios';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
      imports: [HttpModule], // Add HttpModule to the imports array
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
