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
    let apiKey = "";
    let channelID = 0;

    //% block
    export function connect(channel: number, key: string): void {
        channelID = channel;
        apiKey = key;
    }

    //% block
    //% fieldId.defl=Field.Field1
    export function readData(fieldId: Field): void {
        control.inBackground(() => {
            let url = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldId}.json?api_key=${apiKey}&results=1`;
            let response = control.httpGet(url);
            // Process the response
        });
    }
}


