#ifndef KEMPT_KINKAJOU_MEASUREDATA_H
#define KEMPT_KINKAJOU_MEASUREDATA_H

#include <Arduino.h>

struct MeasureData {
  uint8_t sensor_id;
  uint8_t sensor_type;
  uint16_t payload;
};

#endif //KEMPT_KINKAJOU_MEASUREDATA_H
