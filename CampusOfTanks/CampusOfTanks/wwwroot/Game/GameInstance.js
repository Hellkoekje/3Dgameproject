class Registry {
    constructor() {
        this.components = [];
    }

    addComponent(name, comp) {
        console.log("[REGISTERY] Added" + name + " to the registry");
        this.components[name] = comp;
    }
}