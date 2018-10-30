
class GameRenderer {
    constructor(framerate) {
        this.renderInstance = undefined;

        this.framerate = framerate;
        this.lastFrameTime = Date.now();
    }

    createRenderer() {
        if (this.renderInstance) {
            console.log("[RENDERER] Cannot create multiple renderers.");
            return;
        }

        var gameWindow = gameInstance.getGameWindow();
        var width = gameWindow.getWindowWidth();
        var height = gameWindow.getWindowHeight();

        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderInstance = renderer;
    }

    renderFrame() {
        requestAnimationFrame(this.renderFrame);
        var delta = Date.now() - this.lastFrameTime;

        if (delta > (1000 / this.framerate)) {

            console.log("Updating!");

            if (!gameInstance.isReady()) {
                console.log("[RENDERER] Trying to render whilest the game is not ready yet.");
                return;
            }

            var world = gameInstance.getWorld();
            var camera = gameInstance.getCamera();

            if (!world || !camera) {
                console.log("[RENDERER] Cannot render without world or camera object");
                return;
            }

            renderer.render(world.getScene(), camera);
            this.lastFrameTime = Date.now() - (delta % (1000 / this.framerate));
        }
    }

    getRenderer() {
        if (this.renderInstance === "undefined") {
            console.log("[RENDERER] Trying to obtain an uninitialized renderer");
            return;
        }

        return this.renderInstance;
    }

    onResize(eventData) {
        this
    }
}