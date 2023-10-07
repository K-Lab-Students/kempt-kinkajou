//
// Created by o.likhogub on 10/7/2023.
//
#include "Arduino.h"
#include <RH_ASK.h>
#include <SPI.h> 

#ifndef KEMPT_KINKAJOU_TRANSMITTERMODULE_H
#define KEMPT_KINKAJOU_TRANSMITTERMODULE_H

#define RH_TRANSMIT_PIN 12
#define RH_RECEIVE_PIN 11

class TransmitterModule {
private:
    RH_ASK *rhAsk;
public:
    TransmitterModule() {
        rhAsk = new RH_ASK();
    }
    bool init() {
        return rhAsk->init();
    }
    void send(uint8_t * data, int length) {
        rhAsk->send(data, length);
        rhAsk->waitPacketSent();
    }
};


#endif //KEMPT_KINKAJOU_TRANSMITTERMODULE_H
