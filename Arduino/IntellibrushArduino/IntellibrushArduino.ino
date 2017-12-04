#include "I2Cdev.h"
#include <SPI.h>
#include <SD.h>
#include <FastLED.h>

#include "MPU6050_6Axis_MotionApps20.h"

#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    #include "Wire.h"
#endif

MPU6050 accel;
MPU6050 accel2(0x69); // <-- use for AD0 high

#define OUTPUT_READABLE_QUATERNION

#define RGB_DATA 5
#define NUM_RGB 1
#define BUTTON_PIN 10
#define Green Red
#define Red Green
#define green red
#define red green

#define NUM_CYCLES 1000

CRGB rgbled[NUM_RGB];
bool blinkState = false;
long buttonMillis = 0;
bool buttonState = true;
bool didReset = false;

// MPU control/status vars
bool accelReady = false;  // set true if DMP init was successful
bool accel2Ready = false;
uint8_t accelIntStatus;   // holds actual interrupt status byte from MPU
uint8_t accel2IntStatus;
uint8_t accelStatus;      // return status after each device operation (0 = success, !0 = error)
uint8_t accel2Status;
uint16_t packetSize;    // expected DMP packet size (default is 42 bytes)
uint16_t packet2Size;
uint16_t fifoCount;     // count of all bytes currently in FIFO
uint8_t fifoBuffer[64]; // FIFO storage buffer
uint16_t fifo2Count;     // count of all bytes currently in FIFO
uint8_t fifo2Buffer[64]; // FIFO storage buffer

Quaternion quat;
Quaternion quat2;
VectorInt16 acceleration;
VectorInt16 acceleration2;
VectorInt16 accelerationReal;
VectorInt16 accelerationReal2;
VectorInt16 accelerationWorld;
VectorInt16 accelerationWorld2;
VectorFloat gravity;
VectorFloat gravity2;

File logFile;
uint16_t cycles;
long lastCycleTime = 0;

volatile bool accelInterrupt = false;     // indicates whether MPU interrupt pin has gone high
volatile bool accel2Interrupt = false;

void(* reset) (void) = 0;

void accelDataReady() {
    accelInterrupt = true;
}

void accel2DataReady() {
    accel2Interrupt = true;
}

void setup() {
    setupButton();
    setupLogfile();
    setupRGB();
    rgbled[0] = CRGB::Black;
    FastLED.show();
    setupI2C();
    startCollection();
    rgbled[0] = CRGB::Red;
    FastLED.show();
    while(digitalRead(BUTTON_PIN)) {
      //Wait for user to start collection
    }
    rgbled[0] = CRGB::Green;
    FastLED.show();
}

void resetFunc() {
    resetLogFile();
    rgbled[0] = CRGB::Black;
    FastLED.show();
    rgbled[0] = CRGB::Red;
    FastLED.show();
    while(digitalRead(BUTTON_PIN)) {
      //Wait for user to start collection
    }
    rgbled[0] = CRGB::Green;
    FastLED.show();
}

void setupButton() {
    pinMode(BUTTON_PIN, INPUT);
    digitalWrite(BUTTON_PIN, HIGH);
}

void setupLogfile()
{
    if (!SD.begin(4)) {
      errorBlink(1);
    }

    int fileNum = 0;
    while(SD.exists(String(fileNum))) {
      fileNum++;
    }
    
    logFile = SD.open(String(fileNum), FILE_WRITE);
  
    if (!logFile) {
      errorBlink(2);
    }
}

void resetLogFile()
{
    int fileNum = 0;
    while(SD.exists(String(fileNum))) {
      fileNum++;
    }
    
    logFile = SD.open(String(fileNum), FILE_WRITE);
  
    if (!logFile) {
      errorBlink(2);
    }
}

void setupRGB()
{
    FastLED.addLeds<NEOPIXEL, RGB_DATA>(rgbled, NUM_RGB);
}

void setupI2C() {
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
        TWBR = 24; // 400kHz I2C clock (200kHz if CPU is 8MHz)
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif
    
    accel.initialize();
    accel2.initialize();
    if(!accel.testConnection() || !accel2.testConnection()) {
      errorBlink(3);
    }
}

void startCollection() {
    accelStatus = accel.dmpInitialize();
    accel2Status = accel2.dmpInitialize();

    accel.setXGyroOffset(220);
    accel.setYGyroOffset(76);
    accel.setZGyroOffset(-85);
    accel.setZAccelOffset(1788); // 1688 factory default for my test chip
    accel2.setXGyroOffset(220);
    accel2.setYGyroOffset(76);
    accel2.setZGyroOffset(-85);
    accel2.setZAccelOffset(1788); // 1688 factory default for my test chip

    if (accelStatus == 0) {
        accel.setDMPEnabled(true);
        attachInterrupt(0, accelDataReady, RISING);
        accelIntStatus = accel.getIntStatus();
        accelReady = true;
        packetSize = accel.dmpGetFIFOPacketSize();
    } else {
        errorBlink(4);
      }

    if (accel2Status == 0) {
        accel2.setDMPEnabled(true);
        attachInterrupt(1, accel2DataReady, RISING);
        accel2IntStatus = accel2.getIntStatus();
        accel2Ready = true;
        packet2Size = accel2.dmpGetFIFOPacketSize();
    } else {
        errorBlink(5);
      }
}

void loop() {
    if(!didReset && buttonState && !digitalRead(BUTTON_PIN)) {
      buttonState = false;
      buttonMillis = millis(); 
    }
    
    if(!buttonState && !digitalRead(BUTTON_PIN) && millis() - buttonMillis >= 1000) {
      logFile.close();
      rgbled[0] = CRGB::Black;
      FastLED.show();
      resetFunc();
      didReset = true;
      return;
    }

    if(!buttonState && digitalRead(BUTTON_PIN)) {
      didReset = false;
      buttonState = true;
    }
  
    if (!accelReady || !accel2Ready) return;

    while (!accelInterrupt && !accel2Interrupt && fifoCount < packetSize && fifo2Count < packet2Size) {
    }

    if(accelInterrupt && accel2Interrupt) {
      handleAccel();
      handleAccel2();
      printToLog(1);
      printToLog(2);
    }
}

void handleAccel() {
    accelInterrupt = false;
    accelIntStatus = accel.getIntStatus();

    fifoCount = accel.getFIFOCount();

    if ((accelIntStatus & 0x10) || fifoCount == 1024) {
        accel.resetFIFO();
    } else if (accelIntStatus & 0x02) {
        while (fifoCount < packetSize) fifoCount = accel.getFIFOCount();
        
        accel.getFIFOBytes(fifoBuffer, packetSize);
        
        fifoCount -= packetSize;

        accel.dmpGetQuaternion(&quat, fifoBuffer);
        accel.dmpGetAccel(&acceleration, fifoBuffer);
        accel.dmpGetGravity(&gravity, &quat);
        accel.dmpGetLinearAccel(&accelerationReal, &acceleration, &gravity);
        accel.dmpGetLinearAccelInWorld(&accelerationWorld, &accelerationReal, &quat);
    } 
}

void handleAccel2() {
    accel2Interrupt = false;
    accel2IntStatus = accel.getIntStatus();

    fifo2Count = accel2.getFIFOCount();

    if ((accel2IntStatus & 0x10) || fifo2Count == 1024) {
        accel2.resetFIFO();
    } else if (accel2IntStatus & 0x02) {
        while (fifo2Count < packet2Size) fifo2Count = accel2.getFIFOCount();
        
        accel2.getFIFOBytes(fifo2Buffer, packet2Size);
        
        fifo2Count -= packet2Size;

        accel2.dmpGetQuaternion(&quat2, fifo2Buffer);
        accel2.dmpGetAccel(&acceleration2, fifo2Buffer);
        accel2.dmpGetGravity(&gravity2, &quat2);
        accel2.dmpGetLinearAccel(&accelerationReal2, &acceleration2, &gravity2);
        accel2.dmpGetLinearAccelInWorld(&accelerationWorld2, &accelerationReal2, &quat2);
    } 
}

void printToLog(int accelNum) {
    logFile.print(accelNum);
    logFile.print(",");
    
    if(accelNum == 1) {
      logFile.print(quat.w);
      logFile.print(",");
      logFile.print(quat.x);
      logFile.print(",");
      logFile.print(quat.y);
      logFile.print(",");
      logFile.print(quat.z);
      logFile.print(",");
      logFile.print(accelerationWorld.x);
      logFile.print(",");
      logFile.print(accelerationWorld.y);
      logFile.print(",");
      logFile.print(accelerationWorld.z);
      logFile.print(",");
    }
    else {
      logFile.print(quat2.w);
      logFile.print(",");
      logFile.print(quat2.x);
      logFile.print(",");
      logFile.print(quat2.y);
      logFile.print(",");
      logFile.print(quat2.z);
      logFile.print(",");
      logFile.print(accelerationWorld2.x);
      logFile.print(",");
      logFile.print(accelerationWorld2.y);
      logFile.print(",");
      logFile.print(accelerationWorld2.z);
      logFile.print(",");
    }          
    logFile.print(millis()); 
    logFile.print("\n");
}

void errorBlink(int blinks) {
  for(int j = 0; j < 3; j++) {
    for(int i = 0; i < blinks; i++) {
      rgbled[0] = CRGB::Red;
      FastLED.show();
      delay(250);
      rgbled[0] = CRGB::Black;
      FastLED.show();
      delay(250);
    }
    delay(1000);
  }

  reset();
}

