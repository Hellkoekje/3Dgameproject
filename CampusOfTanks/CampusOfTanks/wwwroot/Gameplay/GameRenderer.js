
class GameRenderer {
    constructor(framerate) {
        this.renderInstance = undefined;
        this.framerate = 1000 / framerate;
        this.deltaTime = 0.0;
        this.lastFrameTime = Date.now();

        this.fpsAccum = 0;
        this.fpsCount = 0;
        this.fps = 0;
    }


    computeFPS(time) {
        this.framerateAccumulator += time;

        if (this.framerateAccumulator > 1000.0) {
            var average = this.framerateAccumulator / this.framerateAccumulatorSize;
            this.actualFramerate = average;
            this.framerateAccumulator = 0.0;
        }
        else {
            this.framerateAccumulatorSize++;
        }
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

    process() {
        var now = Date.now();
        var last = this.lastFrameTime;
        var delta = now - last;

        if (delta > this.framerate) {
            this.deltaTime = delta;

            this.processFramerate(delta);
            //this.processFrame();

            this.lastFrameTime = Date.now() - (delta % this.framerate);
        }
    }

    processFramerate(delta) {
        this.fpsAccum += delta;
        this.fpsCount++;


        //Print out any slow frames (fps / 2.5 == slow frame)
        if (delta > this.framerate * 5) {
            console.log("[RENDERER] Warning: rendering is slow, high frame time: " + delta + " msec, expected: " + Math.round((this.framerate*2)))
        }

        //Print out the framerate.
        //if (this.fpsAccum > 1000.0) {
        //    this.fps = 1000.0 / (this.fpsAccum / this.fpsCount);
        //    console.log("[RENDERER] Framerate is " + Math.round(this.fps, 2) + " fps");

        //    this.fpsAccum = 0.0;
        //    this.fpsCount = 0;
        //}
    }

    processFrame() {
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
    }

    getRenderer() {
        if (this.renderInstance === "undefined") {
            console.log("[RENDERER] Trying to obtain an uninitialized renderer");
            return;
        }

        return this.renderInstance;
    }

    onResize(eventData) {
    }
}