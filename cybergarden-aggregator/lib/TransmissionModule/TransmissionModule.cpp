//
// Created by o.likhogub on 10/7/2023.
//

#include "TransmissionModule.h"

#define MSG_LENGTH 5
#define ECC_LENGTH 4
#define TOTAL_LENGTH (MSG_LENGTH + ECC_LENGTH)

bool TransmissionModule::receive(uint8_t &sensor_id, MeasureData &data) {
    uint8_t buf[TOTAL_LENGTH];
    if (!transmitterModule->receive(buf, TOTAL_LENGTH)) {
        return false;
    }

    uint8_t msg[MSG_LENGTH];
    if (!reedSolomonModule->decode(buf, msg)) {
        return false;
    }

    sensor_id = msg[0];
    memcpy((void *) &data, msg+1, 4);

    return true;
}
