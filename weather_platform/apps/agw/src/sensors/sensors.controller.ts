import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { SensorsService } from "./sensors.service";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SensorGetDTOClass } from "../../../sensors-service/src/DTO/SensorGetDTOClass.dto";
import { Prisma, Sensor } from "@weather-platform/prisma-clients/Sensors";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SensorCreateDTOClass } from "../../../sensors-service/src/DTO/SensorCreateDTOClass.dto";

@ApiTags('Sensors')
@Controller('sensors')
export class SensorsController {
  constructor(
    private readonly sensorsService: SensorsService,
  ) {}

  @ApiOperation({ summary: 'Get sensor with Prisma params',
    description: 'Get sensor with Prisma params',
    operationId: 'getWithParams',
    tags: ['Sensors'] })
  @ApiResponse(
    { status: 200,
      type: SensorGetDTOClass,
      description: 'The found sensor',
      content: { 'application/json': { schema: { '$ref': '#/components/schemas/SensorGetDTOClass' } } },
      headers: { 'X-Request-Id': { schema: { type: 'string' } } }
    })
  @ApiResponse({ status: 500, type: Error })
  @ApiOkResponse({
    description: 'Retrieved sensor successfully',
    type: SensorGetDTOClass,
    headers: { 'X-Request-Id': { schema: { type: 'string' } } },
    status: 200
  })
  @ApiNotFoundResponse({
    description: 'No sensor found for this request', status: 404, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error', status: 500, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @Post('get-with-params')
  async getSensors(
    @Body() params: SensorGetDTOClass,
  ): Promise<Partial<Sensor[]> | null> {
    return await this.sensorsService.get(params);
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
  ): Promise<Partial<Sensor> | null> {
    return await this.sensorsService.create(sectionData);
  }
}
