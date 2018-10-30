class Game
{
    constructor() {
        this.readyState = -1;
        this.window = undefined;
        this.input = undefined;
    }

    setReadyState(state) {
        this.readyState = state;
    }

    setGameWindow(window) {
        if (typeof(this.window) !== "undefined") {
            console.log("[GAME] Cannot have multiple game windows!");
            return;
        }

        this.window = window;
    }

    setGameInput(input) {
        if (typeof(this.input) !== "undefined") {
            console.log("[GAME] Cannot have multiple game input managers!");
            return;
        }

        this.input = input;
    }


}