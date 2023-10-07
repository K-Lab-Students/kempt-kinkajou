import { ApiProperty } from "@nestjs/swagger";

type MeasureCreateDTO = {
  sendedInDate: string;
  sensor_uuid: string;
  agregator_uuid: string;
  time: string;
  type: string;
  value: string;
};

export class MeasureCreateDTOClass implements MeasureCreateDTO {
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The sensor uuid'})
  sensor_uuid: string;
  @ApiProperty({description: 'The agregator uuid'})
  agregator_uuid: string;
  @ApiProperty({description: 'The time that sensor was sent the measure'})
  time: string;
  @ApiProperty({description: 'The type of the measure'})
  type: string;
  @ApiProperty({description: 'The value of the measure'})
  value: string;
}
