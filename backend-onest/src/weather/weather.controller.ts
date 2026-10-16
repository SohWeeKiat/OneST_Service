import { Controller, Get, Query } from '@nestjs/common';
import { ForecastAreaData, WeatherService } from './weather.service.js';
import { WeatherForecastDto } from './dto/weather-forecast.dto.js';

type WeatherData = {
    forecast?: ForecastAreaData;
    update_timestamp?: string;
    error?: string;
};

@Controller({
    path: 'weather',
    version: '1',
})
export class WeatherController {

    constructor(private weatherService: WeatherService) {}
    
    @Get('forecast')
    getWeatherForecast(@Query() dto: WeatherForecastDto): WeatherData {
        const result = this.weatherService.getWeatherForecast(dto.area);
        if (!result){
            return { error: `No forecast data found for area: ${dto.area}` };
        }
        return {
            forecast: result,
            update_timestamp: this.weatherService.getLastUpdateTimestamp() || undefined,
        };
    }

    @Get('locations')
    getWeatherLocations() {
        return this.weatherService.getWeatherLocations();
    }
}
