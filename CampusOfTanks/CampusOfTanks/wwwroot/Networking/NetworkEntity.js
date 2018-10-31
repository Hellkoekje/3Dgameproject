class NetworkEntity {
    /**
     * @method constructor
     * @param {Network} - The current network we want to send updates to.
     * @param {bool} remote - Is this entity a remote entity or are we controlling it locally?
     * @param {bool} dirty - True when the entity requires updates.
     * @param {any} - The starting position of this network entity.
     * @param {any} - The starting rotation of this network entity.
     */
    constructor(network, remote, position, rotation) {
        this.net = network;
        this.remote = remote;
        this.entityId = -1;
        this.dirty = false;

        this.position = position;
        this.rotation = rotation;
        this.entityId = this.requestEntityId();
    }

    requestEntityId() {

        var payload = {
            px: this.position.x,
            py: this.position.y,
            pz: this.position.z,
            rx: this.rotation.x,
            ry: this.rotation.y,
            rz: this.rotation.z,
        }

        var networkMsg = new NetworkMessage("request_entity_id", payload);
        this.net.send(networkMsg.stringify());
    }

    setPosition(position)
    {

    }

    setRotation(rotation) {

    }
}