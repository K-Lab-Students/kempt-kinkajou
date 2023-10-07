import {Prisma} from "@weather-platform/prisma-clients/Measures";
import {ApiProperty} from "@nestjs/swagger";

type MeasureGetDTO = {
  skip?: number;
  take?: number;
  cursor?: Prisma.MeasuresWhereUniqueInput;
  where?: Prisma.MeasuresWhereInput;
  orderBy?: Prisma.MeasuresOrderByWithRelationInput;
};

export class MeasureGetDTOClass implements MeasureGetDTO {
  @ApiProperty({description: 'The number of items to skip'})
  skip?: number;
  @ApiProperty({description: 'The number of items to take'})
  take?: number;
  @ApiProperty({description: 'The cursor'})
  cursor?: Prisma.MeasuresWhereUniqueInput;
  @ApiProperty({description: 'The where'})
  where?: Prisma.MeasuresWhereInput;
  @ApiProperty({description: 'The orderBy'})
  orderBy?: Prisma.MeasuresOrderByWithRelationInput;
}
