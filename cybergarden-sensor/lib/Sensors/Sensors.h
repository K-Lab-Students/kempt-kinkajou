#pragma once
#include "Arduino.h"
#include "DHT.h"
#include "math.h"

///////////////////////////////////////////////////////
//                    Pins Definitions
///////////////////////////////////////////////////////                    

#define HUM_SENS 33
#define TEMP_SENS 32
#define PHOTO_SENS 25
#define VIBRO_SENS 26
class Sensor{

  private:
        //KY-015 
        DHT *dht;
        
  public:   
    float temperatureSensor();
    float humiditySensor();
    int photoSensor();
    int vibroSensor();

Sensor()
  {
    dht = new DHT(HUM_SENS, DHT11);
    dht->begin();
  }
};
