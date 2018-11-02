class Camera {

    constructor(near, far, fov, offsetx, offsety, offsetz) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.offsetz = offsetz;

        this.zoom = 1.0;
        this.zoomMin = 0.3;
        this.zoomMax = 3;
        this.zoomSensitivity = 0.1;

        this.near = near;
        this.far = far;
        this.fov = fov;

        this.camera = undefined;
        this.cameraListener = undefined;
        this.followingObject = undefined;

        var input = registry.components.input;

        input.mouseScrollUp((m) => {
            this.zoomCamera("in", m);
        });

        input.mouseScrollDown((m) => {
            this.zoomCamera("out", m);
        });
    }

    getCamera() {
        return this.camera;
    }

    zoomCamera(type, magnitude) {
        //Make sure we don't pass negative numbers.
        var magn = Math.abs(magnitude);

        //Adjust the zoom.
        if (type == "in") {
            this.zoom -= (magn * this.zoomSensitivity);
        }
        else if (type == "out") {
            this.zoom += (magn * this.zoomSensitivity);
        }

        //Clamp the values to respect zoomMin and zoomMax.
        if (this.zoom > this.zoomMax) {
            this.zoom = this.zoomMax;
        }

        if (this.zoom < this.zoomMin) {
            this.zoom = this.zoomMin;
        }
    }

    intializeCamera() {
        var window = registry.components.window;
        this.camera = new THREE.PerspectiveCamera(this.fov, window.aspect, this.near, this.far);

        this.cameraListener = new THREE.AudioListener();
        this.camera.add(this.cameraListener);
    }

    follow(obj) {
        this.followingObject = obj;
    }

    update() {

        if (!this.followingObject) return;

        this.camera.position.x = this.followingObject.position.x; + (this.offsetx * this.zoom);
        this.camera.position.y = this.followingObject.position.y + (this.offsety * this.zoom);
        this.camera.position.z = this.followingObject.position.z + (this.offsetz * this.zoom);
        this.camera.lookAt(this.followingObject.position);
    }

    resize() {
        var window = registry.components.window;
        this.camera.aspect = window.aspect;
        this.camera.updateProjectionMatrix();
    }
}