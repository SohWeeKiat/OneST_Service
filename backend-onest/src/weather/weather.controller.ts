import { Body, Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service.js';
import { WeatherForecastDto } from './dto/weather-forecast.dto.js';

@Controller({
    path: 'weather',
    version: '1',
})
export class WeatherController {

    constructor(private weatherService: WeatherService) {}
    
    @Get('forecast')
    getWeatherForecast(@Query() dto: WeatherForecastDto) {
        return this.weatherService.getWeatherForecast(dto.area);
    }

    @Get('locations')
    getWeatherLocations() {
        return this.weatherService.getWeatherLocations();
    }
}
