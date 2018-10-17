class Network {
    constructor() {
        this.socket = null;
        this.count = 0;
    }

    connect(hostname, port) {
        this.socket = new WebSocket("ws://" + hostname + ":" + 5000 + "/connect_client");
        console.log("[NETWORK] Initialized Socket!");
    }

    isAvailable() {
        return (this.socket.readyState == 1);
    }

    test() {
        //this.socket.send("hello world! x" + this.count);
        this.count++;
    }
}