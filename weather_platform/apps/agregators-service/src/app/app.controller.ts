import { Body, Controller, Get, Post } from "@nestjs/common";
import { AgregatorsClient } from '@weather-platform/prisma-clients';
import { AppService } from './app.service';
import { Agregator, Prisma } from '@weather-platform/prisma-clients/Agregators';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AgregatorCreateDTOClass } from "../DTO/AgregatorCreateDTOClass.dto";
import { AgregatorGetDTOClass } from "../DTO/AgregatorGetDTOClass.dto";
import { AgregatorUpdateDTOClass } from "../DTO/AgregatorUpdateDTOClass.dto";

export type AgregatorGetDTO = {
  skip?: number;
  take?: number;
  cursor?: Prisma.AgregatorWhereUniqueInput;
  where?: Prisma.AgregatorWhereInput;
  orderBy?: Prisma.AgregatorOrderByWithRelationInput;
};

export type AgregatorCreateDTO = {
  sendedInDate: string;
  creatorUUID: string;
  name: string;
  lat: string;
  lng: string;
  height: number;
  country: string;
  city: string;
  region: string;
  street: string;
};

@ApiTags('Agregators')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get agregator with Prisma params',
  })
  @ApiResponse({ status: 200, type: AgregatorGetDTOClass })
  @ApiResponse({ status: 500, type: Error })
  @ApiOkResponse({
    description: 'Retrieved agregator successfully',
    type: AgregatorGetDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No agregator found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('get-with-params')
  async getAgregators(
    @Body() params: AgregatorGetDTO,
  ): Promise<Agregator[]> {

    const { skip, take, cursor, where, orderBy } = params;

    const updatedWhere: Prisma.AgregatorWhereInput = {
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

  @ApiOperation({ summary: 'Create Agregator' })
  @ApiResponse({ status: 200, type: AgregatorCreateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved to create a new agregator successfully',
    type: AgregatorCreateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'The agregator is not created successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('create')
  async createAgregator(
    @Body() sectionData: AgregatorCreateDTO,
  ): Promise<Agregator> {

    const { uuid } = uuidv4();

    const updatedWhere: Prisma.AgregatorCreateInput = {
      ...sectionData,
      uuid: uuid,
    };

    console.log(updatedWhere);

    const agregator = await this.appService.create(updatedWhere);
    return agregator;
  }

  @ApiOperation({ summary: 'Update Agregator' })
  @ApiResponse({ status: 200, type: AgregatorUpdateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved agregator successfully',
    type: AgregatorUpdateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No Sensor found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('update')
  async updateAgregator(
    @Body() params: AgregatorUpdateDTOClass,
  ): Promise<Agregator> {
    const { data, where } = params;

    const agregator: Agregator = await this.appService.update({
      where,
      data,
    });

    return agregator;
  }
}
