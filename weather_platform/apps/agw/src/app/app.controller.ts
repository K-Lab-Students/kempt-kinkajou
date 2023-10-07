import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import {AgregatorService} from "../agregator/agregator.service";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AgregatorCreateDTOClass} from "../../../agregators-service/src/DTO/AgregatorCreateDTOClass.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly agregatorService: AgregatorService,
  ) {}

  @Get('/seed/test/data')
  setSeedTestData() {
    const data: AgregatorCreateDTOClass = {
      sendedInDate: new Date().toISOString(),
      creatorUUID: "test",
      name: "agregator 1",
      lat: "45",
      lng: "76",
      height: 1,
      country: "russia",
      city: "taganrog",
      region: "rostov",
      street: "street",
    }
    this.agregatorService.create(data);
    return "success";
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
