
//  Represents a object in the game
//  Inherits from Group, so we can place it in the scene.
class GameObject extends THREE.Group {

    constructor() {
        super();
        this.updateFunctions = [];
        this.deltaTime = 1.0;

        var gameObjectCollection = registry.components.gameobjects;
        gameObjectCollection.add(this);
    }

    /**
     * Register a method that needs to receive updates.
     * @param {functions} callback The method (callback) we want to call when receiving an update.
     */
    registerUpdate(callback) {
        this.updateFunctions.push(callback);
    }

    /**
     * Gets called when the main game loop updates
     * This will update the all the registered callbacks (via register update.)
     * @param {float} deltaTime The frame time of the current frame.
     */
    update(deltaTime) {
        this.deltaTime = deltaTime;
        for (var i = 0; i < this.updateFunctions.length; i++) {
            this.updateFunctions[i]();
        }
    }
}