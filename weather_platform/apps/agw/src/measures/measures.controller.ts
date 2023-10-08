import {Body, Controller, Get, Param, Post} from "@nestjs/common";
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
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AgregatorGetDTO} from "../../../agregators-service/src/app/app.controller";
import {Measures} from "@weather-platform/prisma-clients/Measures";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {MeasureGetDTOClass} from "../../../measures-service/src/DTO/MeasureGetDTOClass.dto";

function calculateTemperature(ThermistorPin: number): number {
  const R1 = 10000; // Value of R1 on the module
  const c1 = 0.001129148;
  const c2 = 0.000234125;
  const c3 = 0.0000000876741;

  const Vo: number = ThermistorPin;
  const R2: number = R1 * (1023.0 / Vo - 1.0); // Calculate the resistance on the thermistor
  const logR2: number = Math.log(R2);
  let T: number = 1.0 / (c1 + c2 * logR2 + c3 * logR2 * logR2 * logR2); // Temperature in Kelvin
  T = T - 273.15; // Convert Kelvin to Celsius
  return T;
}


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

      console.log(res);

      if (!res) {
        check = true;
      }
    });

    return check ? { code: '200' } : { code: '500' };
  }


  @ApiOperation({ summary: 'Register Measure', description: 'Create Measure using ASC_WEATHER_RGM', operationId: 'create', tags: ['Measures StorePackages'],  })
  @ApiResponse({ status: 200, type: MeasuresCreateSuccessResponse, description: 'The found measures', })
  @Get('register/:sendedInDate/:sensor_id/:agregator_id/:math_time/:msg_type/:msg_value')
  async createMeasuresPackBody(
    @Param('sendedInDate') sendedInDate: string,
    @Param('sensor_id') sensor_uuid: string,
    @Param('agregator_id') agregator_uuid: string,
    @Param('math_time') math_time: string,
    @Param('msg_type') msg_type: string,
    @Param('msg_value') msg_value: string,
  ): Promise<Partial<MeasuresCreateSuccessResponse> | null> {

    if (msg_type === 'temperature') {
      msg_value = calculateTemperature(Number(msg_value)).toString();
    }

    if (math_time == "0") {
      math_time = Date.now().toString();
    }

    const measure_create_data: MeasureCreateDTOLocalClass = {
      sendedInDate: sendedInDate,
      sensor_uuid: sensor_uuid,
      agregator_uuid: agregator_uuid,
      time: math_time,
      type: msg_type,
      value: msg_value,
    }

    const res = await this.measuresService.create(measure_create_data);

    return res ? { code: '200' } : { code: '500' };
  }



  @ApiOperation({
    summary: 'Get measures data with Prisma params', tags: ['Measures'], description: 'Get measures with Prisma params', operationId: 'getWithParams',
  })
  @ApiResponse({ status: 200, type: MeasureGetDTOClass, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, description: 'The found measure', })
  @ApiResponse({ status: 500, type: Error, description: 'Internal server error', headers: { 'X-Request-Id': { schema: { type: 'string' } } }, })
  @ApiOkResponse({
    description: 'Retrieved measures successfully',
    type: MeasureGetDTOClass, status: 200, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiNotFoundResponse({
    description: 'No measures found for this request', type: Error, status: 404, headers: { 'X-Request-Id': { schema: { type: 'string' } } },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error', status: 500, headers: { 'X-Request-Id': { schema: { type: 'string' } } }, type: Error,
  })
  @Post('get-with-params')
  async getAgregators(
    @Body() params: MeasureGetDTOClass,
  ): Promise<Partial<Measures[]> | null> {
    return await this.measuresService.get(params);
  }



  @Get('get-for-ai')
  async getAgregatorsForAI() {
    const res = await this.measuresService.get({
      orderBy: {
        time: "desc"
      },
      take: 10
    });
    const newArray = res.map(item => ({
      sensor_uuid: item.sensor_uuid,
      agregator_uuid: item.agregator_uuid,
      type: item.type,
      value: item.value,
      time: item.time
    }));
    return newArray;
  }
}
