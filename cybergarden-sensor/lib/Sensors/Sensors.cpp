#include <Sensors.h>


float Sensor::temperatureSensor(){
      tempSens->requestTemperatures();
      while (!tempSens->isConversionComplete());
      float temp = tempSens->getTempCByIndex(1);
      return temp;
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


