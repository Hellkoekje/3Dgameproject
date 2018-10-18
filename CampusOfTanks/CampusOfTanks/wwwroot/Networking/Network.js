class Network
{
    constructor() {
        this.socket = null;
    }

    connect(hostname, port) {
        this.socket = new WebSocket("ws://" + hostname + ":" + port + "/connect_client");

        this.socket.onmessage = function (e) {
            console.log(e.data);
        }
        this.socket.onopen = function (event) {
            console.log("[NETWORK] Socket has been opened");
        }

        this.socket.onerror = function (event) {
            console.log("[NETWORK] Uh oh error! " + JSON.stringify(event));
        }

    }

    receive(message) {
        console.log("[NETWORK] I've received shit! " + message);
    }

    isAvailable() {
        return (this.socket != null && this.socket.readyState == 1);
    }

    replicateEntity(content) {
        this.socket.send(content);
        this.count += this.factor;
    }
}