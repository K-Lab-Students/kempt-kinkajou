//
// Created by o.likhogub on 10/7/2023.
//

#include "TransmissionModule.h"

#define MSG_LENGTH 5
#define ECC_LENGTH 4
#define TOTAL_LENGTH (MSG_LENGTH + ECC_LENGTH)

void TransmissionModule::transmit(MeasureData &data) {
    uint8_t msg[MSG_LENGTH];
    msg[0] = data.sensor_id;
    memcpy(msg + 1, (void *) &data, 4);
    

    uint8_t encoded[MSG_LENGTH + ECC_LENGTH];
    reedSolomonModule->encode(msg, encoded);
    transmitterModule->send(encoded, MSG_LENGTH + ECC_LENGTH);
}
