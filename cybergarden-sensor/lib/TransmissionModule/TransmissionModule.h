#ifndef KEMPT_KINKAJOU_TRANSMISSIONMODULE_H
#define KEMPT_KINKAJOU_TRANSMISSIONMODULE_H

#include <Arduino.h>
#include <Crypto.h>
#include <ChaChaPoly.h>
#include "MeasureData.h"
#include "TransmitterModule.h"
#include "ReedSolomonModule.h"

#define MAX_PLAINTEXT_LEN 265

class TransmissionModule {
private:
    TransmitterModule * transmitterModule;
    ReedSolomonModule * reedSolomonModule;
    ChaChaPoly* cipher;
    uint8_t encryptionKey[16] = {0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87,
                    0x88, 0x89, 0x8a, 0x8b, 0x8c, 0x8d, 0x8e, 0x8f};
    uint8_t authdata[16] = {0x50, 0x51, 0x52, 0x53, 0xc0, 0xc1, 0xc2, 0xc3,
                    0xc4, 0xc5, 0xc6, 0xc7};

    uint8_t iv[16] = {0x07, 0x00, 0x00, 0x00, 0x40, 0x41, 0x42, 0x43,
                    0x44, 0x45, 0x46, 0x47};
    uint8_t buffer[MAX_PLAINTEXT_LEN];
    size_t key_size = 16;
    size_t auth_size = 12;
    // size_t data_size = 4;
    size_t iv_size = 12;  
public:

    TransmissionModule(
        TransmitterModule &transmitterModule,
        ReedSolomonModule &reedSolomonModule
        ) :
        transmitterModule(&transmitterModule),
        reedSolomonModule(&reedSolomonModule) {
            cipher = new ChaChaPoly();
        }
    void transmit(MeasureData &data);
};


#endif //KEMPT_KINKAJOU_TRANSMISSIONMODULE_H
