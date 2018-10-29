class NetworkEntity {
    /**
     * @method constructor
     * @param {Network} - The current network we want to send updates to.
     * @param {bool} remote - Is this entity a remote entity or are we controlling it locally?
     * @param {bool} dirty - True when the entity requires updates.
     * @param {THREE.Vector3} - The starting position of this network entity.
     * @param {THREE.Vector3} - The starting rotation of this network entity.
     */
    constructor(network, remote, position, rotation) {
        this.net = network;
        this.remote = remote;
        this.entityId = -1;
        this.dirty = false;

        this.position = position;
        this.rotation = rotation;
    }

    doHandshake() {
        this.net.send("update");
    }

    setPosition(position) {

    }
}