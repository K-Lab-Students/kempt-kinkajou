import { Body, Controller, Post } from "@nestjs/common";
import { AgregatorService } from "./agregator.service";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse, ApiTags
} from "@nestjs/swagger";
import { Agregator, Prisma } from "@weather-platform/prisma-clients/Agregators";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AgregatorCreateDTO, AgregatorGetDTO } from "../../../agregators-service/src/app/app.controller";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AgregatorCreateDTOClass } from "../../../agregators-service/src/DTO/AgregatorCreateDTOClass.dto";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AgregatorGetDTOClass } from "../../../agregators-service/src/DTO/AgregatorGetDTOClass.dto";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AgregatorUpdateDTOClass } from "../../../agregators-service/src/DTO/AgregatorUpdateDTOClass.dto";
import { Sensor } from "@weather-platform/prisma-clients/Sensors";

@ApiTags('Agregators')
@Controller('agregator')
export class AgregatorController {
  constructor(
    private readonly agregatorService: AgregatorService,
  ) {}

  @ApiOperation({
    summary: 'Get agregator with Prisma params', tags: ['Agregators'], description: 'Get agregator with Prisma params', operationId: 'getWithParams',
  })
  @ApiResponse({ status: 200, type: AgregatorGetDTOClass, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, description: 'The found agregator', content: { 'application/json': { schema: { '$ref': '#/components/schemas/AgregatorGetDTOClass' } } }, })
  @ApiResponse({ status: 500, type: Error, description: 'Internal server error', headers: { 'X-Request-Id': { schema: { type: 'string' } } }, })
  @ApiOkResponse({
    description: 'Retrieved agregator successfully',
    type: AgregatorGetDTOClass, status: 200, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiNotFoundResponse({
    description: 'No agreagator found for this request', type: Error, status: 404, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error', status: 500, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @Post('get-with-params')
  async getAgregators(
    @Body() params: AgregatorGetDTO,
  ): Promise<Partial<Agregator[]> | null> {
    return await this.agregatorService.get(params);
  }

  @ApiOperation({ summary: 'Create Agregator', description: 'Create Agregator', operationId: 'create', tags: ['Agregators'],  })
  @ApiResponse({ status: 200, type: AgregatorCreateDTOClass, description: 'The found agregator', content: { 'application/json': { schema: { '$ref': '#/components/schemas/AgregatorCreateDTOClass' } } }, })
  @ApiOkResponse({
    description: 'Retrieved to create a new agregator successfully',
    type: AgregatorCreateDTOClass, status: 200, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiNotFoundResponse({
    description: 'The agregator is not created successfully', type: Error, status: 404, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error', status: 500, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @Post('create')
  async createAgregator(
    @Body() sectionData: AgregatorCreateDTO,
  ): Promise<Partial<Agregator> | null> {
    return await this.agregatorService.create(sectionData);
  }

  @ApiOperation({ summary: 'Update Agregator', description: 'Update Agregator', operationId: 'update', tags: ['Agregators'], })
  @ApiResponse({ status: 200, type: AgregatorUpdateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved agregator successfully',
    type: AgregatorUpdateDTOClass, status: 200, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiNotFoundResponse({
    description: 'No Sensor found for this request', status: 404, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error', status: 500, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @Post('update')
  async updateAgregator(
    @Body() params: AgregatorUpdateDTOClass,
  ): Promise<Partial<Agregator> | null> {
    return await this.agregatorService.update(params);
  }
}
