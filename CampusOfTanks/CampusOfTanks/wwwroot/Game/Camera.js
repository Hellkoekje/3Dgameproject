class Camera {

    constructor(near, far, fov, offsetx, offsety, offsetz) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.offsetz = offsetz;

        this.near = near;
        this.far = far;
        this.fov = fov;

        this.zoom = 2;
        this.zoomMin = 0.3;
        this.zoomMax = 4;
        this.zoomSensitivity = 0.1;


        this.camera = undefined;
        this.cameraListener = undefined;
        this.followingObject = undefined;

        this.followingPosition = this.cameraPosition;
        this.cameraPosition = new THREE.Vector3(100, 100, 100);

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

        this.cameraPosition = this.followingObject.position;
        this.followingPosition = this.followingObject.position;
    }

    update() {

        if (!this.followingObject) return;

        var backwards = new THREE.Vector3(0, 200 * this.zoom, -200 * this.zoom);
        var matrix = this.followingObject.matrix;
        this.followingPosition = backwards.applyMatrix4(matrix);

        var position = math.lerp3d(this.cameraPosition, this.followingPosition, 0.8);
        this.camera.position.copy(position);
        this.camera.lookAt(this.followingObject.position);
    }

    resize() {
        var window = registry.components.window;
        this.camera.aspect = window.aspect;
        this.camera.updateProjectionMatrix();
    }
}