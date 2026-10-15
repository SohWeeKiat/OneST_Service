import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UenServiceController } from './uen-service/uen-service.controller.js';

@Module({
  imports: [],
  controllers: [AppController, UenServiceController],
  providers: [AppService],
})
export class AppModule {}
