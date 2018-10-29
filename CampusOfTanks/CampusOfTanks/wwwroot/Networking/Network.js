class Network
{
    constructor() {
        this.socket = null;
    }

    connect(hostname, port) {
        this.socket = new WebSocket("ws://" + hostname + ":" + port + "/connect_client");

        this.socket.onmessage = function (e) {
            receive(message);
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

    send(message)
    {
        console.log("[NETWORK] Yo send shit; " + message);
        this.socket.send(message);
    }

    isAvailable()
    {
        return (this.socket != null && this.socket.readyState == 1);
    }

}