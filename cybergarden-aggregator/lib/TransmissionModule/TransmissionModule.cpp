//
// Created by o.likhogub on 10/7/2023.
//

#include "TransmissionModule.h"

#define MSG_LENGTH 5
#define ECC_LENGTH 4
#define TOTAL_LENGTH (MSG_LENGTH + ECC_LENGTH)

void TransmissionModule::decrypt(uint8_t *data, size_t data_size, uint8_t *output_data)
{
    size_t posn, len, inc = 5;
    cipher->clear();
    cipher->setKey(encryptionKey, key_size);
    cipher->setIV(iv, iv_size);
    memset(buffer, 0xBA, sizeof(buffer));

    for (posn = 0; posn < auth_size; posn += inc) {
        len = auth_size - posn;
        if (len > inc)
            len = inc;
        cipher->addAuthData(authdata + posn, len);
    }

    for (posn = 0; posn < data_size; posn += inc) {
        len = data_size - posn;
        if (len > inc)
            len = inc;
        cipher->decrypt(buffer + posn, data + posn, len);
    }

    memcpy(output_data, buffer, data_size);
}

bool TransmissionModule::receive(uint8_t &sensor_id, MeasureData &data)
{
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
