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
  MeasureData measureData_temp;
  measureData_temp.sensor_id = 0xA5;
  measureData_temp.sensor_type = 0x01;
  measureData_temp.payload = sensors.temperatureSensor();
  transmissionModule.transmit(measureData_temp);

  delay(100);

  MeasureData measureData_hum;
  measureData_hum.sensor_id = 0xA5;
  measureData_hum.sensor_type = 0x02;
  measureData_hum.payload = sensors.humiditySensor();
  transmissionModule.transmit(measureData_hum);

  delay(100);

  MeasureData measureData_photo;
  measureData_photo.sensor_id = 0xA5;
  measureData_photo.sensor_type = 0x03;
  measureData_photo.payload = sensors.photoSensor();
  transmissionModule.transmit(measureData_photo);

  delay(100);

  MeasureData measureData_vibro;
  measureData_vibro.sensor_id = 0xA5;
  measureData_vibro.sensor_type = 0x04;
  measureData_vibro.payload = sensors.photoSensor();
  transmissionModule.transmit(measureData_vibro);

  delay(100);

  Serial.print(sensors.humiditySensor(), DEC);
  Serial.print(" ");
  Serial.print(sensors.temperatureSensor(), DEC);
  Serial.print(" ");
  Serial.print(sensors.photoSensor(), DEC);
  Serial.print(" ");
  Serial.println(sensors.vibroSensor(), DEC);
  
  delay(100);
}