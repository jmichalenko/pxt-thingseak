enum Field {
    //% block="Field 1"
    Field1 = 1,
    //% block="Field 2"
    Field2 = 2,
    //% block="Field 3"
    Field3 = 3,
    //% block="Field 4"
    Field4 = 4,
    //% block="Field 5"
    Field5 = 5
}

//% color=#0fbc11 icon="\uf1eb"
namespace ThingSpeak {
    let readApiKey = "";
    let writeApiKey = "";
    let channelID = 0;
    let fieldValues: number[] = [];

    /**
     * Connect to a ThingSpeak channel.
     * @param channel The ThingSpeak channel ID, eg: 12345
     * @param readKey The read API key for the ThingSpeak channel
     * @param writeKey The write API key for the ThingSpeak channel
     */
    //% block="connect to channel $channel with read key $readKey and write key $writeKey"
    export function connect(channel: number, readKey: string, writeKey: string): void {
        channelID = channel;
        readApiKey = readKey;
        writeApiKey = writeKey;
    }

    /**
     * Connect to Wi-Fi.
     * @param ssid The SSID of the Wi-Fi network
     * @param password The password of the Wi-Fi network
     */
    //% block="connect to Wi-Fi SSID $ssid with password $password"
    export function connectWiFi(ssid: string, password: string): void {
        control.inBackground(() => {
            serial.redirect(
                SerialPin.P8,
                SerialPin.P12,
                BaudRate.BaudRate115200
            );
            serial.writeString(`AT+CWJAP="${ssid}","${password}"\r\n`);
            basic.pause(5000);
        });
    }

    /**
     * Read data from a specific field in the ThingSpeak channel.
     * @param fieldId The field number to read from, eg: Field.Field1
     */
    //% block="read data from $fieldId"
    export function readData(fieldId: Field): void {
        control.inBackground(() => {
            let url = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldId}.json?api_key=${readApiKey}&results=1`;
            let response = control.httpGet(url);
            let jsonResponse = JSON.parse(response);
            fieldValues[fieldId] = parseInt(jsonResponse.feeds[0][`field${fieldId}`]);
        });
    }

    /**
     * Get the value read from a specific field.
     * @param fieldId The field number to get the value from, eg: Field.Field1
     */
    //% block="get value from $fieldId"
    export function getFieldValue(fieldId: Field): number {
        return fieldValues[fieldId];
    }

    /**
     * Write data to a specific field in the ThingSpeak channel.
     * @param fieldId The field number to write to, eg: Field.Field1
     * @param value The value to write to the field, eg: 42
     */
    //% block="write $value to $fieldId"
    export function writeData(fieldId: Field, value: number): void {
        control.inBackground(() => {
            let url = `https://api.thingspeak.com/update?api_key=${writeApiKey}&field${fieldId}=${value}`;
            control.httpGet(url);
        });
    }
}


