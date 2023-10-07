import { Module } from '@nestjs/common';
import { AgregatorService } from './agregator.service';
import { AgregatorController } from './agregator.controller';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [AgregatorService],
  controllers: [AgregatorController],
  exports: [AgregatorService],
})
export class AgregatorModule {}
