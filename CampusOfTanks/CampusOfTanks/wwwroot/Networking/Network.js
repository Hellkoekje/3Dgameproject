class Network
{
    constructor()
    {
        this.socket = null;
    }

    connect(hostname, port)
    {
        this.socket = new WebSocket("ws://" + hostname + ":" + 5000 + "/connect_client");
        console.log("[NETWORK] Initialized Socket!");
    }
}