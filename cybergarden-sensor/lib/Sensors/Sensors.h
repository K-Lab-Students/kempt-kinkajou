#pragma once
#include "Arduino.h"
#include "DallasTemperature.h"
#include "DHT.h"

///////////////////////////////////////////////////////
//                    Pins Definitions
///////////////////////////////////////////////////////                    

#define HUM_SENS 33
#define TEMP_SENS 32
#define PHOTO_SENS 25
#define VIBRO_SENS 26
class Sensor{

  private:
        // KY-001 
        OneWire *oneWire;
        DallasTemperature *tempSens;
        //KY-015 
        DHT *dht;
        
  public:   
    float temperatureSensor();
    float humiditySensor();
    int photoSensor();
    int vibroSensor();

Sensor()
  {
    oneWire = new OneWire(TEMP_SENS);
    tempSens = new DallasTemperature(oneWire);
    dht = new DHT(HUM_SENS, DHT11);
    tempSens->begin();
    dht->begin();
  }


};
