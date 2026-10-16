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
  it('should return weather locations', () => {
    const locations = controller.getWeatherLocations();
    expect(locations).toBeDefined();
    expect(Array.isArray(locations)).toBe(true);
  });

  it('should return weather forecast for a valid area', () => {
    const locations = controller.getWeatherLocations();
    if (locations.length > 0) {
      const area = locations[0].name;
      const forecast = controller.getWeatherForecast({ area });
      expect(forecast).toBeDefined();
      expect(forecast.forecast).toBeDefined();
      expect(forecast.update_timestamp).toBeDefined();
    }
  });

  it('should return error for an invalid area', () => {
    const forecast = controller.getWeatherForecast({ area: 'InvalidArea' });
    expect(forecast).toBeDefined();
    expect(forecast.error).toBeDefined();
    expect(forecast.error).toBe('No forecast data found for area: InvalidArea');
  });
});
