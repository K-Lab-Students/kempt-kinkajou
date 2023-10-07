import { Body, Controller, Post } from "@nestjs/common";
import { MeasureCreateDTOLocalClass, MeasuresService } from "./measures.service";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse
} from "@nestjs/swagger";
import {
  MeasuresCreateDTOClass,
  MeasuresCreateSuccessResponse,
  MeasuresDataClass
} from "./DTO/CreateMeasuresClass.dto";

@Controller('measures')
export class MeasuresController {
  constructor(
    private readonly measuresService: MeasuresService,
  ) {}

  @ApiOperation({ summary: 'Register Measure', description: 'Create Measure using ASC_WEATHER_RGM', operationId: 'create', tags: ['Measures StorePackages'],  })
  @ApiResponse({ status: 200, type: MeasuresCreateSuccessResponse, description: 'The found measures', })
  @ApiOkResponse({
    description: 'Retrieved to register a new measures successfully',
    type: MeasuresCreateDTOClass, status: 200, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiNotFoundResponse({
    description: 'The measures is not registered successfully', type: Error, status: 404, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error', status: 500, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @Post('register')
  async createMeasuresPack(
    @Body() packages: MeasuresCreateDTOClass,
  ): Promise<Partial<MeasuresCreateSuccessResponse> | null> {

    let check = true;

    packages.measuresDataList.map(async (measure: MeasuresDataClass) => {
      const measure_create_data: MeasureCreateDTOLocalClass = {
        sendedInDate: measure.sendedInDate,
        sensor_uuid: measure.sensor_uuid,
        agregator_uuid: measure.agregator_uuid,
        time: measure.math_time,
        type: measure.msg_type,
        value: measure.msg_value,
      };

      const res = await this.measuresService.create(measure_create_data);

      if (!res) {
        check = true;
      }
    });

    return check ? { code: '200' } : { code: '500' };
  }
}
