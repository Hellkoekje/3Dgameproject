
//  Main class for dealing with camera stuff.
class Camera {

    /**
     * Constructor
     * @param {any} near The near clipping field of the camera.
     * @param {any} far The far clipping field of the camera.
     * @param {any} fov The field of view of the camera.
     */
    constructor(near, far, fov) {

        //Camera variables.
        this.near = near;
        this.far = far;
        this.fov = fov;

        //Zoom variables.
        this.zoom = 2;
        this.zoomMin = 0.3;
        this.zoomMax = 4;
        this.zoomSensitivity = 0.1;

        //Camera objects.
        this.camera = undefined;
        this.cameraListener = undefined;

        //Following variables.
        this.followingObject = undefined;
        this.followingPosition = this.cameraPosition;
        this.cameraPosition = new THREE.Vector3(100, 100, 100);

        var input = registry.components.input;

        //Tell input we are listening for the scroll wheel up event.
        input.mouseScrollUp((m) => {
            this.zoomCamera("in", m);
        });

        //Tell input we are listening for the scroll wheel down event.
        input.mouseScrollDown((m) => {
            this.zoomCamera("out", m);
        });
    }

    /**
     *  Get the reference to the THREE.js camera object. 
     *  @returns {Camera} The camera reference.
    */
    getCamera() {
        return this.camera;
    }

    /**
     * Handle camera zooming in and out.
     * @param {any} type Indicated if we want to zoom in or out.
     * @param {any} magnitude Indicates how fast/much we want to zoom in or out by.
     */
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

    /*
     * Create and initialize the camera object.
     */
    intializeCamera() {
        //Create the camera.
        var window = registry.components.window;
        this.camera = new THREE.PerspectiveCamera(this.fov, window.aspect, this.near, this.far);

        //Attach an listener.
        this.cameraListener = new THREE.AudioListener();
        this.camera.add(this.cameraListener);
    }

    /**
     * Make the camera follow an (Game)Object.
     * @param {GameObject} obj The object we want to follow.
     */
    follow(obj) {
        //The object we want to follow.
        this.followingObject = obj;

        //Set the positions accordingly.
        this.cameraPosition = this.followingObject.position;
        this.followingPosition = this.followingObject.position;
    }

    /*
     * Update the camera, such as the following target.
     */
    update() {

        //If we are not following anyone, do nothing.
        if (!this.followingObject) return;

        //Calculate positions the camera must be in, in local space of the following object.
        var backwards = new THREE.Vector3(0, 200 * this.zoom, -200 * this.zoom);
        var matrix = this.followingObject.matrix;
        this.followingPosition = backwards.applyMatrix4(matrix);

        //Lerp to that position
        var position = math.lerp3d(this.cameraPosition, this.followingPosition, 0.8);
        this.camera.position.copy(position);

        //Look at the object.
        this.camera.lookAt(this.followingObject.position);
    }

    /*
     * Handle resizing of the window, camera needs to update it's aspect and projection matrix.
    */
    resize() {
        var window = registry.components.window;
        this.camera.aspect = window.aspect;
        this.camera.updateProjectionMatrix();
    }
}