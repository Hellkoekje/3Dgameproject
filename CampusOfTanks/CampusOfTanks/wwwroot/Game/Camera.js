class Camera {

    constructor(near, far, fov, offsetx, offsety, offsetz) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.offsetz = offsetz;

        this.near = near;
        this.far = far;
        this.fov = fov;

        this.camera = undefined;
        this.target = undefined;
    }

    getCamera() {
        return this.camera;
    }


    intializeCamera() {
        var window = registry.components.window;
        this.camera = new THREE.PerspectiveCamera(this.fov, window.aspect, this.near, this.far);
    }

    setTarget(obj) {
        this.target = obj;
    }

    update() {

        if (!this.target) return;

        camera.position.x = target.position.x + this.offsetx;
        camera.position.y = target.position.y + this.offsety;
        camera.position.z = target.position.z + this.offsetz;

        camera.lookAt(target.position);
    }
}