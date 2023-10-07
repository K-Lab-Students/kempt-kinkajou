import { Injectable } from '@nestjs/common';
import { MeasuresClient } from '@weather-platform/prisma-clients';
import { Measures, Prisma } from '@weather-platform/prisma-clients/Measures';
@Injectable()
export class AppService {
  private prisma: MeasuresClient;
  constructor() {
    this.prisma = new MeasuresClient()
  }

  async create(data: Prisma.MeasuresCreateInput): Promise<Measures> {
    try {
      this.prisma.$connect();
      const measure = await this.prisma.measures.create({
        data,
      });
      this.prisma.$disconnect();
      return measure;
    } catch (e: any) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MeasuresWhereUniqueInput;
    where?: Prisma.MeasuresWhereInput;
    orderBy?: Prisma.MeasuresOrderByWithRelationInput;
  }): Promise<Measures[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.measures.findMany({
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
    where: Prisma.MeasuresWhereUniqueInput;
    data: Prisma.MeasuresUpdateInput;
  }): Promise<Measures> {
    try {
      const { where, data } = params;
      return this.prisma.measures.update({
        data,
        where,
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async delete(uuid: string): Promise<Measures> {
    try {
      return this.prisma.measures.update({
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
