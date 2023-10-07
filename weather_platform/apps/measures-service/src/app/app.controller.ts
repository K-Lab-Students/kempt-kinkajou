import { Body, Controller, Get, Post } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Measures, Prisma } from '@weather-platform/prisma-clients/Measures';

import { AppService } from './app.service';
import { MeasureCreateDTOClass } from "../DTO/MeasureCreateDTOClass.dto";
import {MeasureGetDTOClass} from "../DTO/MeasureGetDTOClass.dto";

type MeasureUpdateDTO = {
  where: Prisma.MeasuresWhereUniqueInput;
  data: Prisma.MeasuresUpdateInput;
};

class MeasureUpdateDTOClass {
  @ApiProperty({description: 'The where'})
  where: Prisma.MeasuresWhereUniqueInput;
  @ApiProperty({description: 'The data'})
  data: Prisma.MeasuresUpdateInput;
}

@ApiTags('Measures')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get measure with Prisma params',
  })
  @ApiResponse({ status: 200, type: MeasureGetDTOClass })
  @ApiResponse({ status: 500, type: Error })
  @ApiOkResponse({
    description: 'Retrieved sensor successfully',
    type: MeasureGetDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No measure found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('get-with-params')
  async getMeasures(
    @Body() params: MeasureGetDTOClass,
  ): Promise<Measures[]> {

    const { skip, take, cursor, where, orderBy } = params;

    const updatedWhere: Prisma.MeasuresWhereInput = {
      ...where,
      isDeleted: false,
    };

    const res = this.appService.get({
      skip,
      take,
      cursor,
      where: updatedWhere,
      orderBy,
    });
    return res;
  }

  @ApiOperation({ summary: 'Create Measure' })
  @ApiResponse({ status: 200, type: MeasureCreateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved to create a new measure successfully',
    type: MeasureCreateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'The measure is not created successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('create')
  async createMeasure(
    @Body() sectionData: MeasureCreateDTOClass,
  ): Promise<Measures> {

    console.log("calles");

    const { uuid } = uuidv4();

    const updatedWhere: Prisma.MeasuresCreateInput = {
      ...sectionData,
      uuid: uuid,
    };

    const measure = await this.appService.create(updatedWhere);
    return measure;
  }

  @ApiOperation({ summary: 'Update Measure' })
  @ApiResponse({ status: 200, type: MeasureUpdateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved measure successfully',
    type: MeasureUpdateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No measure found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('update')
  async updateMeasure(
    @Body() params: MeasureUpdateDTO,
  ): Promise<Measures> {
    const { data, where } = params;

    const measure: Measures = await this.appService.update({
      where,
      data,
    });

    return measure;
  }
}
