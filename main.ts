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

    //% block
    export function connect(channel: number, readKey: string, writeKey: string): void {
        channelID = channel;
        readApiKey = readKey;
        writeApiKey = writeKey;
    }

    //% block
    //% fieldId.defl=Field.Field1
    export function readData(fieldId: Field): void {
        control.inBackground(() => {
            let url = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldId}.json?api_key=${readApiKey}&results=1`;
            let response = control.httpGet(url);
            let jsonResponse = JSON.parse(response);
            fieldValues[fieldId] = parseInt(jsonResponse.feeds[0][`field${fieldId}`]);
        });
    }

    //% block
    //% fieldId.defl=Field.Field1
    export function getFieldValue(fieldId: Field): number {
        return fieldValues[fieldId];
    }

    //% block
    //% fieldId.defl=Field.Field1
    //% value.defl=0
    export function writeData(fieldId: Field, value: number): void {
        control.inBackground(() => {
            let url = `https://api.thingspeak.com/update?api_key=${writeApiKey}&field${fieldId}=${value}`;
            control.httpGet(url);
        });
    }
}


