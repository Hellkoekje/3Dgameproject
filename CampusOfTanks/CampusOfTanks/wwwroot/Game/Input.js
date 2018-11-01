class Input {
    constructor() {
        this.mousePosition = new THREE.Vector2(0, 0);
        this.keyCallbacks = [];
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

        //camera.updateMatrixWorld();
        //raycaster.setFromCamera(mouse, camera);
        //var intersects = raycaster.intersectObjects(scene.children);

        //if (intersects.length > 0) {

        //}
        //else {

        //}
    }

    update() {

        for (var i = 0; i < 256; i++)
        {
            var keyNow = this.keyStates[i];
            var keyLast = this.keyStatesCopy[i];

            //Check for key press.
            if (!keyLast && keyNow) {
                this.invokeKey(i, "press");
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
}