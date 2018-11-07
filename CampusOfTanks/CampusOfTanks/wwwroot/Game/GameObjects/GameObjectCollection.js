//  Hold all the references to our game objects
//  So we have a convient way of being able to interact with them.
class GameObjectCollection {
    constructor() {
        this.gameObjects = [];
    }

    /**
     * Add a new game object to this collection.
     * @param {GameObject} gameObject The game object we want to add.
     */
    add(gameObject) {
        this.gameObjects.push(gameObject);
    }

    /**
     * Tell all the gameobjects that we've received an update.
     * @param {float} deltaTime The frame time of the current iteration.
     */
    update(deltaTime) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(deltaTime);
        }
    }
}