
class GameRenderer {
    constructor(gameWindow) {
        this.renderInstance = undefined;
        this.gameWindow = gameWindow;
    }

    createRenderer() {

        if (this.renderInstance !== "undefined") {
            console.log("[RENDERER] Cannot create multiple renderers.");
            return;
        }

        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.gameWindow.getWidth(), this.gameWindow.getHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderInstance = renderer;
    }

    getRenderer() {
        if (this.renderInstance === "undefined") {
            console.log("[RENDERER] Trying to obtain an uninitialized renderer");
            return;
        }

        return this.renderInstance;
    }

    onResize(eventData) {
        console.log(JSON.stringify(eventData));
    }
}