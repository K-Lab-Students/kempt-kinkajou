import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { Sensor, Prisma } from "@weather-platform/prisma-clients/Sensors";

@Injectable()
export class SensorsService {
  constructor(private readonly httpService: HttpService) {}

  SENSORS_SERVICE_URL = (process.env.SENSORS_SERVICE_PROTOCOL || 'http://') +
    (process.env.SENSORS_SERVICE_HOST || 'localhost') + ':' +
    (process.env.SENSORS_SERVICE_PORT || 3000) +
    '/api/';

  async get(data: Prisma.SensorFindManyArgs): Promise<Partial<Sensor[]> | null> {
    try {
      const response = await this.httpService.post(this.SENSORS_SERVICE_URL + 'get-with-params', data).toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: Prisma.SensorCreateInput): Promise<Partial<Sensor> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.SENSORS_SERVICE_URL + 'create', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(data: {
    where: Prisma.SensorWhereUniqueInput;
    data: Prisma.SensorUpdateInput;
  }): Promise<Partial<Sensor> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.SENSORS_SERVICE_URL + 'update', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
