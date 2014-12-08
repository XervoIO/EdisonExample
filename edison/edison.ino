

const int pinTemp = A0;      // pin of temperature sensor
const char url[ ] = "example.com/temp";

float temperature;
int B=3975;                  // B value of the thermistor
float resistance;

void setup()
{
    Serial.begin(9600);
}

void loop()
{
    int val = analogRead(pinTemp);                               // get analog value
    resistance=(float)(1023-val)*10000/val;                      // get resistance
    temperature=1/(log(resistance/10000)/B+1/298.15)-273.15;     // calc temperature

    // Convert the temp to JSON data.
    char dataStr[100];
    sprintf(dataStr, "{ \"temp\" : %1.2f }", temperature);

    // Use curl to POST the data.
    char command[100];
    sprintf(command, "curl -H \"Content-Type: application/json\" -d \'%s\' %s", dataStr, url);
    system(command);

    delay(1000);          // delay 1s
}
