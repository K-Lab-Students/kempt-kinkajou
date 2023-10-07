import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@weather-platform/prisma-clients/Agregators";

type AgregatorUpdateDTO = {
  where: Prisma.AgregatorWhereUniqueInput;
  data: Prisma.AgregatorUpdateInput;
};
export class AgregatorUpdateDTOClass implements AgregatorUpdateDTO {
  @ApiProperty({description: 'The where'})
  where: Prisma.AgregatorWhereUniqueInput;
  @ApiProperty({description: 'The data'})
  data: Prisma.AgregatorUpdateInput;
}
