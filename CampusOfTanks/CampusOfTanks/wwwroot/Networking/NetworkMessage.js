class NetworkMessage {
    constructor(messageType, payload) {
        this.header = {type: messageType};
        this.payload = payload;
    }

    stringify()
    {
        return JSON.stringify({ header: this.header, payload: this.payload });
    }
}