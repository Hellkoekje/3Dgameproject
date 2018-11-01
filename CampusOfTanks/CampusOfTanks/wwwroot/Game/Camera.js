class Camera {

    constructor(near, far, fov, offsetx, offsety, offsetz) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.offsetz = offsetz;

        this.near = near;
        this.far = far;
        this.fov = fov;

        this.camera = undefined;
        this.followingObject = undefined;
    }

    getCamera() {
        return this.camera;
    }


    intializeCamera() {
        var window = registry.components.window;
        this.camera = new THREE.PerspectiveCamera(this.fov, window.aspect, this.near, this.far);
    }

    follow(obj) {
        console.log("hi");
        this.followingObject = obj;
    }

    update() {

        if (!this.followingObject) return;

        this.camera.position.x = this.followingObject.position.x;
        this.camera.position.y = this.followingObject.position.y + this.offsety;
        this.camera.position.z = this.followingObject.position.z + this.offsetz;

        console.log(this.offsetz);

        this.camera.lookAt(this.followingObject.position);
    }
}