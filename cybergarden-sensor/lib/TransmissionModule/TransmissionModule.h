#include <Arduino.h>
#include "MeasureData.h"
#include "TransmitterModule.h"
#include "ReedSolomonModule.h"

#ifndef KEMPT_KINKAJOU_TRANSMISSIONMODULE_H
#define KEMPT_KINKAJOU_TRANSMISSIONMODULE_H

class TransmissionModule {
private:
    TransmitterModule * transmitterModule;
    ReedSolomonModule * reedSolomonModule;
public:
    unsigned char * encryptionKey = 0;
    TransmissionModule(
        TransmitterModule &transmitterModule,
        ReedSolomonModule &reedSolomonModule
        ) :
        transmitterModule(&transmitterModule),
        reedSolomonModule(&reedSolomonModule) {}
    void transmit(MeasureData &data);
};


#endif //KEMPT_KINKAJOU_TRANSMISSIONMODULE_H