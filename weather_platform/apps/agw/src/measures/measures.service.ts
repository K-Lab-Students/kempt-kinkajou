import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { Measures, Prisma } from "@weather-platform/prisma-clients/Measures";
import { ApiProperty } from "@nestjs/swagger";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { MeasureCreateDTOClass } from "../../../measures-service/src/DTO/MeasureCreateDTOClass.dto";

type MeasureCreateLocalDTO = {
  sendedInDate: string;
  sensor_uuid: string;
  agregator_uuid: string;
  time: string;
  type: string;
  value: string;
};

export class MeasureCreateDTOLocalClass implements MeasureCreateLocalDTO {
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The UUID of the creator'})
  sensor_uuid: string;
  @ApiProperty({description: 'The agregator uuid'})
  agregator_uuid: string;
  @ApiProperty({description: 'The time that sensor was sent the measure'})
  time: string;
  @ApiProperty({description: 'The type of the measure'})
  type: string;
  @ApiProperty({description: 'The value of the measure'})
  value: string;
}


@Injectable()
export class MeasuresService {
  constructor(private readonly httpService: HttpService) {}

  MEASURES_SERVICE_URL = (process.env.MEASURES_SERVICE_PROTOCOL || 'http://') +
    (process.env.MEASURES_SERVICE_HOST || 'localhost') + ':' +
    (process.env.MEASURES_SERVICE_PORT || 3000) +
    '/api/';

  async get(data: Prisma.MeasuresFindManyArgs): Promise<Partial<Measures[]> | null> {
    try {
      const response = await this.httpService.post(this.MEASURES_SERVICE_URL + 'get-with-params', data).toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: MeasureCreateDTOLocalClass): Promise<Partial<Measures> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const updated_data: MeasureCreateDTOClass = {
        ...data,
        creatorUUID: '1',
      }
      const response = await this.httpService.post(this.MEASURES_SERVICE_URL + 'create', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(data: {
    where: Prisma.MeasuresWhereUniqueInput;
    data: Prisma.MeasuresUpdateInput;
  }): Promise<Partial<Measures> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.MEASURES_SERVICE_URL + 'update', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
