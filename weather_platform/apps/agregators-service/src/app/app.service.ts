import { Injectable } from '@nestjs/common';
import { AgregatorsClient } from '@weather-platform/prisma-clients';
import { Agregator, Prisma } from "@weather-platform/prisma-clients/Agregators";

@Injectable()
export class AppService {
  private prisma: AgregatorsClient;
  constructor() {
    this.prisma = new AgregatorsClient()
  }

  async create(data: Prisma.AgregatorCreateInput): Promise<Agregator> {
    try {
      this.prisma.$connect();
      const Agregator = await this.prisma.agregator.create({
        data,
      });
      this.prisma.$disconnect();
      return Agregator;
    } catch (e: any) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AgregatorWhereUniqueInput;
    where?: Prisma.AgregatorWhereInput;
    orderBy?: Prisma.AgregatorOrderByWithRelationInput;
  }): Promise<Agregator[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.agregator.findMany({
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
    where: Prisma.AgregatorWhereUniqueInput;
    data: Prisma.AgregatorUpdateInput;
  }): Promise<Agregator> {
    try {
      const { where, data } = params;
      return this.prisma.agregator.update({
        data,
        where,
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async delete(uuid: string): Promise<Agregator> {
    try {
      return this.prisma.agregator.update({
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
