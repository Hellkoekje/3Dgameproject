class Game
{
    constructor() {
        this.readyState = false;
        this.window = undefined;
        this.input = undefined;
        this.renderer = undefined;
    }

    setReady() {
        this.readyState = true;
    }

    isReady() {
        return this.readyState;
    }

    setGameWindow(window) {
        if (typeof(this.window) !== "undefined") {
            console.log("[GAME] Cannot have multiple game windows!");
            return;
        }

        this.window = window;
    }

    getGameWindow() {
        if (this.window) {
            return this.window;
        }

        console.log("[GAME] Window does not exist (yet?)");
        return undefined;
    }

    setGameInput(input) {
        if (typeof(this.input) !== "undefined") {
            console.log("[GAME] Cannot have multiple game input managers!");
            return;
        }

        this.input = input;
    }

    getGameInput() {
        if (this.input) {
            return this.input;
        }

        console.log("[GAME] Input does not exist (yet?)");
        return undefined;
    }

    setGameRenderer(renderer) {
        if (typeof (this.renderer) !== "undefined") {
            console.log("[GAME] Cannot have multiple game renderers!");
            return;
        }

        this.renderer = renderer;
    }

    getGameRenderer() {
        if (this.renderer) {
            return this.renderer;
        }

        console.log("[GAME] Renderer does not exist (yet?)");
        return undefined;
    }

}