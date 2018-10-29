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
        this.socket.send("This article explains how to get started with WebSockets in ASP.NET Core. WebSocket (RFC 6455) is a protocol that enables two-way persistent communication channels over TCP connections. It's used in apps that benefit from fast, real-time communication, such as chat, dashboard, and game apps.");
    }

    isAvailable()
    {
        console.log(this.socket.readyState)
        return (this.socket != null && this.socket.readyState == 1);
    }

}