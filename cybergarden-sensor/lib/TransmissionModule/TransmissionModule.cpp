//
// Created by o.likhogub on 10/7/2023.
//

#include "TransmissionModule.h"

#define MSG_LENGTH 5
#define ECC_LENGTH 4
#define TOTAL_LENGTH (MSG_LENGTH + ECC_LENGTH)

void TransmissionModule::transmit(MeasureData &data)
{

    size_t posn, len, inc = 5;
    size_t data_size = 4;
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

    cipher->encrypt(buffer + 1, (uint8_t*)&data, data_size);
    buffer[0] = data.sensor_id;

    //*************************
    //Encryption Testing
    //*************************

    // byte buffer2[MAX_PLAINTEXT_LEN];
    // memset(buffer2, 0xBA, sizeof(buffer));

    // cipher->setKey(encryptionKey, 16);
    // cipher->setIV(iv, iv_size);

    // for (posn = 0; posn < data_size; posn += inc) {
    //     len = data_size - posn;
    //     if (len > inc)
    //         len = inc;
    //     cipher->decrypt(buffer2 + posn, buffer + posn, len);
    // }

    // if (memcmp(buffer2, (uint8_t*)&data + 1, data_size) != 0) {
    //     Serial.println("doesn't work");
    // } else{
    //     Serial.println("works");
    // }

    uint8_t encoded[MSG_LENGTH + ECC_LENGTH];
    reedSolomonModule->encode(buffer, encoded);
    transmitterModule->send(encoded, MSG_LENGTH + ECC_LENGTH);
}
