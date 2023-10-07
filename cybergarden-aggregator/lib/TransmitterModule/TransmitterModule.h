//
// Created by o.likhogub on 10/7/2023.
//
#ifndef KEMPT_KINKAJOU_TRANSMITTERMODULE_H
#define KEMPT_KINKAJOU_TRANSMITTERMODULE_H
#include "Arduino.h"
#include <RH_ASK.h>
#include <SPI.h> 



class TransmitterModule {
private:
    RH_ASK *rhAsk;
public:
    TransmitterModule() {
        rhAsk = new RH_ASK(2000, 4, 5, 0);
    }
    bool init() {
        return rhAsk->init();
    }
    void send(uint8_t * data, uint8_t length) {
    }
    bool receive(uint8_t * data, uint8_t length) {
        return rhAsk->recv(data, &length);
    }
};


#endif //KEMPT_KINKAJOU_TRANSMITTERMODULE_H
