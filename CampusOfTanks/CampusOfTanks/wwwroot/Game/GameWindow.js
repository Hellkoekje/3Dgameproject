//Handle anything related to the game viewport.
class GameWindow {

    /**
     * Constructor
     * @param {any} window The window of the DOM/
     * @param {any} document The document of the DOM.
     */
    constructor(window, document) {

        //Dom elements.
        this.window = window;
        this.document = document;

        //Window properties.
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //Aspect ration and create the renderer.
        this.aspect = this.width / this.height;
        this.renderer = this.createRenderer();
    }

    /**
     * Recalculate the renderer upon resizing.
     */
    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //Recalculate the aspect ratio.
        this.aspect = this.width / this.height;

        var cam = registry.components.camera;

        //Do a null check, in case the cam hasn't been added yet.
        if (cam) {
            cam.resize();
        }

        //Update the renderer
        this.renderer.setSize(this.width, this.height);
    }

    /**
     * Create a THREEjs render.
     * @returns {THREE.WebGLRenderer} Returns the THREEJS renderer.
     */
    createRenderer() {
        // Make the renderer.
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(this.window.devicePixelRatio);
        renderer.setSize(this.width, this.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        //Add to the DOM.
        this.document.body.appendChild(renderer.domElement);

        return renderer;
    }

    /**
     * Update the renderer
     * @param {any} scene The scene we are using.
     * @param {any} camera The camera we are using.
     */
    update(scene, camera) {
        this.renderer.render(scene, camera);
    }
}