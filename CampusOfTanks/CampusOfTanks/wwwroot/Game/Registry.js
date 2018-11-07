//Stores all the components of the game.
class Registry {
    constructor() {
        this.components = [];
    }

    /**
     *  Adds a new component.
     * @param {any} name Name of the component
     * @param {any} comp Reference to the component.
     */
    addComponent(name, comp) {
        console.log("[REGISTRY] Added " + name + " to the registry");
        this.components[name] = comp;
    }
}