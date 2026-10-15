import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller.js';
import { WeatherService } from './weather.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports:[HttpModule]
})
export class WeatherModule {}
