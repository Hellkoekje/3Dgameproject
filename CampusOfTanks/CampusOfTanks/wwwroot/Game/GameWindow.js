class GameWindow {

    constructor(window, document) {
        this.window = window;
        this.document = document;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.renderer = this.createRenderer();
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;

        var cam = registry.components.camera;

        if (cam) {
            console.log("1");
            var camera = cam.getCamera();
            camera.aspect = this.aspect;
            camera.updateProjectionMatrix();
        }

        this.renderer.setSize(this.width, this.height);
    }

    createRenderer() {
        // Renderer
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(this.window.devicePixelRatio);
        renderer.setSize(this.width, this.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.document.body.appendChild(renderer.domElement);

        return renderer;
    }

    update(scene, camera) {
        this.renderer.render(scene, camera);
    }
}