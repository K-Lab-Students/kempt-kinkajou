import { ApiProperty } from "@nestjs/swagger";

type SensorCreateDTO = {
  sendedInDate: string;
  creatorUUID: string;
  name: string;
  lat: string;
  lng: string;
  height: number;
  agregator_uuid: string;
};

export class SensorCreateDTOClass implements SensorCreateDTO {
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The UUID of the creator'})
  creatorUUID: string;
  @ApiProperty({description: 'The sensor name'})
  name: string;
  @ApiProperty({description: 'The sensor latitude'})
  lat: string;
  @ApiProperty({description: 'The sensor longitude'})
  lng: string;
  @ApiProperty({description: 'The sensor height from the ground'})
  height: number;
  @ApiProperty({description: 'The agregator uuid'})
  agregator_uuid: string;
}
