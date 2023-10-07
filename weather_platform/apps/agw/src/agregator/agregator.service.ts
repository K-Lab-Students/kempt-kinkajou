import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { Agregator, Prisma } from "@weather-platform/prisma-clients/Agregators";

@Injectable()
export class AgregatorService {
  constructor(private readonly httpService: HttpService) {}

  AGREGATOR_SERVICE_URL = (process.env.AGREGATOR_SERVICE_PROTOCOL || 'http://') +
    (process.env.AGREGATOR_SERVICE_HOST || 'localhost') + ':' +
    (process.env.AGREGATOR_SERVICE_PORT || 3000) +
    '/api/';

  async get(data: Prisma.AgregatorFindManyArgs): Promise<Partial<Agregator[]> | null> {
    try {
      const response = await this.httpService.post(this.AGREGATOR_SERVICE_URL + 'get-with-params', data).toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: Prisma.AgregatorCreateInput): Promise<Partial<Agregator> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.AGREGATOR_SERVICE_URL + 'create', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(data: {
    where: Prisma.AgregatorWhereUniqueInput;
    data: Prisma.AgregatorUpdateInput;
  }): Promise<Partial<Agregator> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.AGREGATOR_SERVICE_URL + 'update', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
