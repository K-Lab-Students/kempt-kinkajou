import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@weather-platform/prisma-clients/Agregators";

export class AgregatorGetDTOClass {
  @ApiProperty({description: 'The number of items to skip'})
  skip?: number;
  @ApiProperty({description: 'The number of items to take'})
  take?: number;
  @ApiProperty({description: 'The cursor'})
  cursor?: Prisma.AgregatorWhereUniqueInput;
  @ApiProperty({description: 'The where'})
  where?: Prisma.AgregatorWhereInput;
  @ApiProperty({description: 'The orderBy'})
  orderBy?: Prisma.AgregatorOrderByWithRelationInput;
}
