import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasuresModule } from "../measures/measures.module";
import { SensorsModule } from "../sensors/sensors.module";
import { AgregatorModule } from "../agregator/agregator.module";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule, MeasuresModule, AgregatorModule, SensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
