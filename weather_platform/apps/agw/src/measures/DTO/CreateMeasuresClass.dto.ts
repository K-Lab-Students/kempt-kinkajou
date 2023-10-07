import { ApiProperty } from "@nestjs/swagger";

type MeasuresData = {
  uuid: string;
  agregator_uuid: string;
  sensor_uuid: string;
  msg_type: string;
  msg_value: string;
  sendedInDate: string;
  math_time: string;
}

type MeasuresCreateDTO = {
  sendedInDate: string;
  measuresDataList: [MeasuresData];
}

export class MeasuresDataClass implements MeasuresData {
  @ApiProperty({description: 'The uuid of the measure'})
  uuid: string;
  @ApiProperty({description: 'The agregator uuid'})
  agregator_uuid: string;
  @ApiProperty({description: 'The sensor uuid'})
  sensor_uuid: string;
  @ApiProperty({description: 'The type of the measure'})
  msg_type: string;
  @ApiProperty({description: 'The value of the measure'})
  msg_value: string;
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The time that sensor was sent the measure'})
  math_time: string;
}

export class MeasuresCreateDTOClass implements MeasuresCreateDTO {
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The measures data list'})
  measuresDataList: [MeasuresDataClass];
}

export class MeasuresCreateSuccessResponse {
  @ApiProperty({description: 'The measures registred successfully'})
  code: string;
}
