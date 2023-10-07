//
// Created by o.likhogub on 10/7/2023.
//

#ifndef KEMPT_KINKAJOU_REEDSOLOMONMODULE_H
#define KEMPT_KINKAJOU_REEDSOLOMONMODULE_H

#include <Arduino.h>
#include <RS-FEC.h>

#define MSG_LENGTH 5
#define ECC_LENGTH 4

class ReedSolomonModule {
private:
    RS::ReedSolomon<MSG_LENGTH, ECC_LENGTH> rs;
public:
    void encode(uint8_t * msg, uint8_t * encoded) {
        rs.Encode(msg, encoded);
    }
    bool decode(uint8_t * encoded, uint8_t * msg) {
        return rs.Decode(encoded, msg) == 0;
    }
};


#endif //KEMPT_KINKAJOU_REEDSOLOMONMODULE_H
