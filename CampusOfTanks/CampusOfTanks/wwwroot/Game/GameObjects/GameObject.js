class GameObject extends THREE.Group {

    constructor() {
        super();
        this.updateFunctions = [];
        this.deltaTime = 1.0;

        var gameObjectCollection = registry.components.gameobjects;
        gameObjectCollection.add(this);
    }

    registerUpdate(callback) {
        this.updateFunctions.push(callback);
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;
        for (var i = 0; i < this.updateFunctions.length; i++) {
            this.updateFunctions[i]();
        }
    }
}