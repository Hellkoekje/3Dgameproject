class Input {
    constructor() {
        this.raycaster = new THREE.Raycaster();

        this.mousePosition = new THREE.Vector2(0, 0);
        this.mouseWorldPosition = new THREE.Vector3(0, 0, 0);
        this.mouseHitObject = undefined;

        this.keyCallbacks = [];
        this.mouseCallbacks = [];

        this.keyStatesCopy = [];
        this.keyStates = [];

        for (var i = 0; i < 256; i++) {
            this.keyStates[i] = false;
            this.keyStatesCopy[i] = false;
        }
    }

    keyHeldAction(key, callback) {
        if (!this.isAsciiNumber(key)) {
            return;
        }

        this.keyCallbacks.push({
            callback: callback,
            type: "held",
            keyCode: key
        });
    }

    keyPressAction(key, callback) {
        if (!this.isAsciiNumber(key)) {
            return;
        }

        this.keyCallbacks.push({
            callback: callback,
            type: "press",
            keyCode: key
        });
    }

    keyReleaseAction(key, callback) {
        if (!this.isAsciiNumber(key)) {
            return;
        }

        this.keyCallbacks.push({
            callback: callback,
            type: "release",
            keyCode: key
        });
    }

    mouseScrollUp(callback) {
        this.mouseCallbacks.push({
            type: "scroll-up",
            callback: callback
        });
    }

    mouseScrollDown(callback) {
        this.mouseCallbacks.push({
            type: "scroll-down",
            callback: callback
        });
    }

    isAsciiNumber(num) {
        if (typeof (num) !== "number" || num < 0 || num >= 256) {
            return false;
        }

        return true;
    }

    keyDownEvent(data) {
        var key = data.keyCode;

        if (!this.isAsciiNumber(key)) {
            console.log("[INPUT] Huh, why are we trying to cram non-ascii in our key array!? -> " + key);
        }

        this.keyStates[key] = true;
    }

    keyUpEvent(data) {
        var key = data.keyCode;

        if (!this.isAsciiNumber(key)) {
            console.log("[INPUT] Huh, why are we trying to cram non-ascii in our key array!? -> " + key);
        }

        this.keyStates[key] = false;
    }

    mouseMoveEvent(event) {
        var mx = (event.clientX / window.innerWidth) * 2 - 1;
        var my = -(event.clientY / window.innerHeight) * 2 + 1;

        this.mousePosition.set(mx, my);
        var gameScene = registry.components.scene;
        var gameCam = registry.components.camera;

        var camera = gameCam.getCamera();
        var scene = gameScene.getScene();

        camera.updateMatrixWorld();
        this.raycaster.setFromCamera(this.mousePosition, camera);
        var intersects = this.raycaster.intersectObjects(scene.children);

        //Check if we hit something.
        if (intersects.length > 0) {
            var first = intersects[0];
            this.mouseWorldPosition.set(first.point.x, first.point.y, first.point.z);
            this.mouseHitObject = first.object;
        }
        else {
            this.mouseWorldPosition.set(0, 0, 0);
            this.mouseHitObject = undefined;
        }
    }

    mouseWheelEvent(event) {
        var dy = event.deltaY;
        var magnitude = Math.round(dy / 100);
        var type = "";

        if (magnitude < 0) {
            type = "up";
        }
        else if (magnitude > 0) {
            type = "down";
        }

        this.invokeMouseEvent({
            type: "scroll-" + type,
            magnitude: magnitude
        });
    }


    update() {

        for (var i = 0; i < 256; i++)
        {
            var keyNow = this.keyStates[i];
            var keyLast = this.keyStatesCopy[i];

            //Check for key press.
            if (!keyLast && keyNow) {
                this.invokeKey(i, "press");
                this.invokeKey(i, "held");
            }

            //Check for key release.
            if (keyLast && !keyNow) {
                this.invokeKey(i, "release");
            }


            //Check for key held.
            if (keyLast && keyNow) {
                this.invokeKey(i, "held");
            }
        }

        //Copy
        for (var n = 0; n < this.keyStates.length; n++) {
            this.keyStatesCopy[n] = this.keyStates[n];
        }
    }

    invokeKey(key, type) {
        for (var i = 0; i < this.keyCallbacks.length; i++) {
             var data = this.keyCallbacks[i];

            if (data.keyCode == key && data.type == type) {
                data.callback();
            }
        }
    }

    invokeMouseEvent(mouse) {
        for (var i = 0; i < this.mouseCallbacks.length; i++) {
            var data = this.mouseCallbacks[i];

            if (mouse.type == data.type) {
                data.callback(mouse.magnitude);
            }
        }
    }
}