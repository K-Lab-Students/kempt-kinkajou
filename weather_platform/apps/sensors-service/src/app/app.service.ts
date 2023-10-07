import { Injectable } from '@nestjs/common';
import { SensorsClient } from '@weather-platform/prisma-clients';
import { Sensor, Prisma } from '@weather-platform/prisma-clients/Sensors';

@Injectable()
export class AppService {
  private prisma: SensorsClient;
  constructor() {
    this.prisma = new SensorsClient()
  }

  async create(data: Prisma.SensorCreateInput): Promise<Sensor> {
    try {
      this.prisma.$connect();
      const Sensor = await this.prisma.sensor.create({
        data,
      });
      this.prisma.$disconnect();
      return Sensor;
    } catch (e: any) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SensorWhereUniqueInput;
    where?: Prisma.SensorWhereInput;
    orderBy?: Prisma.SensorOrderByWithRelationInput;
  }): Promise<Sensor[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.sensor.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async update(params: {
    where: Prisma.SensorWhereUniqueInput;
    data: Prisma.SensorUpdateInput;
  }): Promise<Sensor> {
    try {
      const { where, data } = params;
      return this.prisma.sensor.update({
        data,
        where,
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async delete(uuid: string): Promise<Sensor> {
    try {
      return this.prisma.sensor.update({
        where: {
          uuid: uuid,
        },
        data: {
          isDeleted: true,
        },
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

}
