import { ApiProperty } from "@nestjs/swagger";

export class AgregatorCreateDTOClass {
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The UUID of the creator'})
  creatorUUID: string;
  @ApiProperty({description: 'The agregator name'})
  name: string;
  @ApiProperty({description: 'The agregator latitude'})
  let: number;
  @ApiProperty({description: 'The agregator longitude'})
  lng: number;
  @ApiProperty({description: 'The agregator height from the ground'})
  height: number;
  @ApiProperty({description: 'The agregator country'})
  country: string;
  @ApiProperty({description: 'The agregator city'})
  city: string;
  @ApiProperty({description: 'The agregator region'})
  region: string;
  @ApiProperty({description: 'The agregator street'})
  street: string;
}
