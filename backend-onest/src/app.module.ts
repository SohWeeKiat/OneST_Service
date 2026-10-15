import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UenServiceController } from './uen-service/uen-service.controller.js';
import { WeatherModule } from './weather/weather.module.js';

@Module({
  imports: [WeatherModule],
  controllers: [AppController, UenServiceController],
  providers: [AppService],
})
export class AppModule {}
