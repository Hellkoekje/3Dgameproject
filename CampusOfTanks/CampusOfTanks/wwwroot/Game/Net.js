class Net {
    constructor() {
        this.socket = null;
    }

    connect(hostname, port) {

        var gameWindow = registry.components.window;

        this.socket = new WebSocket("ws://" + hostname + ":" + port + "/connect_client");

        this.socket.onmessage = function (e) {
            receive(message);
        };

        this.socket.onopen = function (event) {
            console.log("[NETWORK] Socket has been opened");
        };

        this.socket.onerror = function (event) {
            console.log("[NETWORK] Uh oh error! " + JSON.stringify(event));
        };
    }

    receive(message) {
        console.log("[NETWORK] I've received shit! " + message);
    }

    send(message) {
        if (!this.isAvailable()) {
            console.log("[NETWORK] Trying to send data on a closed socket!");
            return;
        }

        if (!message === "") {
            console.log("[NETWORK] Trying to send empty data, skipping");
            return;
        }

        this.socket.send(message);
    }

    isAvailable() {
        return (this.socket != null && this.socket.readyState == 1);
    }
}