import { Body, Controller, Get, Post } from "@nestjs/common";
import { SensorsClient } from '@weather-platform/prisma-clients';
import { Sensor, Prisma } from '@weather-platform/prisma-clients/Sensors';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { SensorGetDTOClass } from "../DTO/SensorGetDTOClass.dto";
import { SensorCreateDTOClass } from "../DTO/SensorCreateDTOClass.dto";

type SensorUpdateDTO = {
  where: Prisma.SensorWhereUniqueInput;
  data: Prisma.SensorUpdateInput;
};

class SensorUpdateDTOClass {
  @ApiProperty({description: 'The where'})
  where: Prisma.SensorWhereUniqueInput;
  @ApiProperty({description: 'The data'})
  data: Prisma.SensorUpdateInput;
}

@ApiTags('Sensors')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @ApiOperation({
    summary: 'Get sensor with Prisma params',
  })
  @ApiResponse({ status: 200, type: SensorGetDTOClass })
  @ApiResponse({ status: 500, type: Error })
  @ApiOkResponse({
    description: 'Retrieved sensor successfully',
    type: SensorGetDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No sensor found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('get-with-params')
  async getMatrix(
    @Body() params: SensorGetDTOClass,
  ): Promise<Sensor[]> {

    const { skip, take, cursor, where, orderBy } = params;

    const updatedWhere: Prisma.SensorWhereInput = {
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

  @ApiOperation({ summary: 'Create Sensor' })
  @ApiResponse({ status: 200, type: SensorCreateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved to create a new sensor successfully',
    type: SensorCreateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'The sensor is not created successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('create')
  async createMatrix(
    @Body() sectionData: SensorCreateDTOClass,
  ): Promise<Sensor> {

    const { uuid } = uuidv4();

    const updatedWhere: Prisma.SensorCreateInput = {
      ...sectionData,
      uuid: uuid,
    };

    const sensor = await this.appService.create(updatedWhere);
    return sensor;
  }

  @ApiOperation({ summary: 'Update Sensor' })
  @ApiResponse({ status: 200, type: SensorUpdateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved Sensor successfully',
    type: SensorUpdateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No Sensor found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('update')
  async updateTask(
    @Body() params: SensorUpdateDTO,
  ): Promise<Sensor> {
    const { data, where } = params;

    const sensor: Sensor = await this.appService.update({
      where,
      data,
    });

    return sensor;
  }
}
