import { Module } from '@nestjs/common';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [MeasuresController],
  providers: [MeasuresService],
  exports: [MeasuresService],
})
export class MeasuresModule {}
