#include <Arduino.h>
#include "TransmitterModule.h"
#include "TransmissionModule.h"
#include "ReedSolomonModule.h"

TransmitterModule transmitterModule;
ReedSolomonModule reedSolomonModule;
TransmissionModule transmissionModule(transmitterModule, reedSolomonModule);

void setup() {
  Serial.begin(115200);
  transmitterModule.init();
  // pinMode(LED_BUILTIN, OUTPUT);
}

uint16_t getMockSensorData() {
  return rand() & 0xFFFF;
}

void loop() {
  MeasureData measureData;
  measureData.sensor_id = 0xA5;
  measureData.sensor_type = 0x01;
  measureData.payload = getMockSensorData();
  // transmissionModule.encrypt((uint8_t*)&measureData+1, 4, (uint8_t*)&measureData+1);
  transmissionModule.transmit(measureData);

  // analogWrite(LED_BUILTIN, 255);
  // delay(200);
  // analogWrite(LED_BUILTIN, 0);
  // delay(10000);
}