class Game
{
    constructor() {
        this.readyState = false;
        this.components = [];
    }

    setReady() {
        this.readyState = true;
    }

    isReady() {
        return this.readyState;
    }

    registerComponent(key, value) {

        if (value === "undefined") {
            console.log("[GAME] Components cannot be undefined values.");
            return;
        }

        var keyExists = this.components[key] === "undefined";

        if (keyExists) {
            console.log("[GAME] This component is already registered.");
            return;
        }

        this.components[key] = value;
    }

    fetchComponent(key) {
        var keyExists = this.components[key] === "undefined";

        if (!keyExists) {
            console.log("[GAME] This component does not exist!");
            return undefined;
        }

        return this.components[key];
    }
}