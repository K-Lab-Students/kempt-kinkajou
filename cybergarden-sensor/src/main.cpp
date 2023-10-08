#include <Arduino.h>
#include "TransmitterModule.h"
#include "TransmissionModule.h"
#include "ReedSolomonModule.h"
#include "Sensors.h"

TransmitterModule transmitterModule;
ReedSolomonModule reedSolomonModule;
TransmissionModule transmissionModule(transmitterModule, reedSolomonModule);
Sensor sensors;

void setup() {
  Serial.begin(115200);
  transmitterModule.init();
}

uint16_t getMockSensorData() {
  return rand() & 0xFFFF;
}

void loop() {
  MeasureData measureData;
  measureData.sensor_id = 0xA5;
  measureData.sensor_type = 0x01;
  measureData.payload = getMockSensorData();
  Serial.print(sensors.humiditySensor(), DEC);
  Serial.print(" ");
  Serial.print(sensors.temperatureSensor(), DEC);
  Serial.print(" ");
  Serial.print(sensors.photoSensor(), DEC);
  Serial.print(" ");
  Serial.println(sensors.vibroSensor(), DEC);
  transmissionModule.transmit(measureData);
  delay(100);
}