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

  it('should return weather locations', () => {
    const locations = service.getWeatherLocations();
    expect(locations).toBeDefined();
    expect(Array.isArray(locations)).toBe(true);
  });

  it('should return weather forecast for a valid area', () => {
    const locations = service.getWeatherLocations();
    if (locations.length > 0) {
      const area = locations[0].name;
      const forecast = service.getWeatherForecast(area);
      expect(forecast).toBeDefined();
      expect(forecast?.area).toBe(area);
      expect(forecast?.forecast).toBeDefined();
    }
  });

  it('should return undefined for an invalid area', () => {
    const forecast = service.getWeatherForecast('InvalidArea');
    expect(forecast).toBeUndefined();
  });

  it('should return the last update timestamp', () => {
    const timestamp = service.getLastUpdateTimestamp();
    expect(timestamp).toBeDefined();
  });
});
