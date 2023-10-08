#include <Sensors.h>


float Sensor::temperatureSensor(){ 
      return analogRead(TEMP_SENS); 
}

float Sensor::humiditySensor(){
      float h = dht->readHumidity();
      if (isnan(h)) {
            return -1;
            }
      else{
            return h;
      }
}

int Sensor::photoSensor(){
      int value = analogRead(PHOTO_SENS);
      return value;
}

int Sensor::vibroSensor(){
      int value = analogRead(VIBRO_SENS);
      return value;
}


