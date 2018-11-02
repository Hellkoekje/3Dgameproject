class GameObjectCollection {
    constructor() {
        this.gameObjects = [];
    }

    add(gameObject) {
        this.gameObjects.push(gameObject);
    }

    update(deltaTime) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(deltaTime);
        }
    }
}