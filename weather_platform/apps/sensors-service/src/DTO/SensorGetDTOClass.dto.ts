import { Prisma } from "@weather-platform/prisma-clients/Sensors";
import { ApiProperty } from "@nestjs/swagger";

type SensorGetDTO = {
  skip?: number;
  take?: number;
  cursor?: Prisma.SensorWhereUniqueInput;
  where?: Prisma.SensorWhereInput;
  orderBy?: Prisma.SensorOrderByWithRelationInput;
};

export class SensorGetDTOClass implements SensorGetDTO {
  @ApiProperty({description: 'The number of items to skip'})
  skip?: number;
  @ApiProperty({description: 'The number of items to take'})
  take?: number;
  @ApiProperty({description: 'The cursor'})
  cursor?: Prisma.SensorWhereUniqueInput;
  @ApiProperty({description: 'The where'})
  where?: Prisma.SensorWhereInput;
  @ApiProperty({description: 'The orderBy'})
  orderBy?: Prisma.SensorOrderByWithRelationInput;
}
