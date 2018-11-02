class GameObject extends THREE.Group {

    constructor() {
        super();
        this.updateFunctions = [];

        var gameObjectCollection = registry.components.gameobjects;
        gameObjectCollection.add(this);
    }

    registerUpdate(callback) {
        this.updateFunctions.push(callback);
    }

    update(deltaTime) {
        for (var i = 0; i < this.updateFunctions.length; i++) {
            this.updateFunctions[i](deltaTime);
        }
    }
}