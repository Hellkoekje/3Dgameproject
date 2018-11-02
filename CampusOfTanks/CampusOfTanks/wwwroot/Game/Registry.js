class Registry {
    constructor() {
        this.components = [];
    }

    addComponent(name, comp) {
        console.log("[REGISTRY] Added " + name + " to the registry");
        this.components[name] = comp;
    }
}