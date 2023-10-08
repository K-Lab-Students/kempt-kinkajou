#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <ReedSolomonModule.h>
#include <MeasureData.h>
#include <TransmissionModule.h>
#include <TransmitterModule.h>
#include <RH_ASK.h>
#ifdef RH_HAVE_HARDWARE_SPI
#include <SPI.h> // Not actually used but needed to compile
#endif

#include "Uuid.h"

String serverName = "http://gw.cg.k-lab.su/api/v1/measures/register";

ReedSolomonModule reedSolomonModule;
TransmitterModule transmitterModule;
TransmissionModule transmissionModule(transmitterModule, reedSolomonModule);

UUID uuid;

const char *ntpServer = "pool.ntp.org";
unsigned long epochTime;

void setup()
{
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin("Darius wifi", "alstroemeria");
  Serial.println("\nConnecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(100);
  }
  pinMode(LED_BUILTIN, OUTPUT);
  transmitterModule.init();
  configTime(0, 0, ntpServer);
}

uint8_t sensor_id;
MeasureData measureData;

unsigned long getTime()
{
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo))
  {
    Serial.println("Failed to obtain time");
    return (0);
  }
  time(&now);
  return now;
}

String getPayload(MeasureData &data)
{
  String serverPath = serverName;
  serverPath += String("/") + getTime();
  serverPath += String("/") + data.sensor_id;
  serverPath += String("/") + WiFi.macAddress();
  serverPath += String("/") + getTime();
  if (data.sensor_type == 1) {
    serverPath += String("/") + "temperature";
  } else {
    serverPath += String("/") + data.sensor_type;
  }
  serverPath += String("/") + data.payload;
  return serverPath;
}

bool sendPayload(MeasureData &data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String serverPath = getPayload(data);

    http.begin(serverPath.c_str());
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
      return true;
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  return false;
}

MeasureData data;

void loop() {
  if (transmissionModule.receive(sensor_id, data)) {
    data.sensor_id = sensor_id;
    data.sensor_type = data.sensor_type;
    data.payload = data.payload;
    analogWrite(LED_BUILTIN, 255);
    sendPayload(data);
    delay(100);
    analogWrite(LED_BUILTIN, 0);
  }
}