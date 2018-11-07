//Handle anything related to input.
class Input {

    constructor() {
        //Mouse and key callbacks.
        this.keyCallbacks = [];
        this.mouseCallbacks = [];

        //Key manangement.
        this.keyStatesCopy = [];
        this.keyStates = [];

        //Initialize all the keys and the copy.
        for (var i = 0; i < 256; i++) {
            this.keyStates[i] = {
                state: false,
                counter: 0
            };

            this.keyStatesCopy[i] = {
                state: false,
                counter: 0
            };
        }
    }

    /**
     * register a function for when a key is held down.
     * @param {int} key The key we want to listen for,
     * @param {function} callback THe functions we need to call when this happens.
     */
    keyHeldAction(key, callback) {
        //Is this an ASCII key?
        if (!this.isAsciiNumber(key)) {
            return;
        }

        //Register to the callback array.
        this.keyCallbacks.push({
            callback: callback,
            type: "held",
            keyCode: key
        });
    }

     /**
     * register a function for when a key is pressed.
     * @param {int} key The key we want to listen for,
     * @param {function} callback THe functions we need to call when this happens.
     */
    keyPressAction(key, callback) {
        //Is this an ASCII key?
        if (!this.isAsciiNumber(key)) {
            return;
        }

        //Register to the callback array.
        this.keyCallbacks.push({
            callback: callback,
            type: "press",
            keyCode: key
        });
    }

    /**
     * register a function for when a key is released.
     * @param {int} key The key we want to listen for,
     * @param {function} callback THe functions we need to call when this happens.
     */
    keyReleaseAction(key, callback) {
        //Is this an ASCII key?
        if (!this.isAsciiNumber(key)) {
            return;
        }

        //Register to the callback array.
        this.keyCallbacks.push({
            callback: callback,
            type: "release",
            keyCode: key
        });
    }

    /**
     * Register a callback for scroll up
     * @param {function} callback the callback to call when this happens.
     */
    mouseScrollUp(callback) {

        //Register in the mouse callbacks.
        this.mouseCallbacks.push({
            type: "scroll-up",
            callback: callback
        });
    }

    /**
     * Register a callback for scroll down
     * @param {function} callback the callback to call when this happens.
     */
    mouseScrollDown(callback) {

        //Register in the mouse callbacks.
        this.mouseCallbacks.push({
            type: "scroll-down",
            callback: callback
        });
    }

    /**
     * Checks if the given number is a valid ascii value.
     * @param {int} num the value we want to check if it's a ascii character.
     * @returns {bool} True means it's valid ascii value.
     */
    isAsciiNumber(num) {
        if (typeof (num) !== "number" || num < 0 || num >= 256) {
            return false;
        }

        return true;
    }

    /**
     * Event listener for key down.
     * @param {any} data Event data passed by JS.
     */
    keyDownEvent(data) {
        //Get the key code.
        var key = data.keyCode;

        //Is the key valid?
        if (!this.isAsciiNumber(key)) {
            console.log("[INPUT] Huh, why are we trying to cram non-ascii in our key array!? -> " + key);
        }

        //Get the value from the keystates array.
        //Add coutner and set state.
        var original = this.keyStates[key];
        original.state = true;
        original.counter++;

        //Copy it back in.
        this.keyStates[key] = original;

        //Invoke events.
        this.invokeKey(key, "press");
        this.invokeKey(key, "held");
    }

    /**
     * Event listener for key up.
     * @param {any} data Event data passed by JS.
     */
    keyUpEvent(data) {
        //Get keycode.
        var key = data.keyCode;

        //Check if valid.
        if (!this.isAsciiNumber(key)) {
            console.log("[INPUT] Huh, why are we trying to cram non-ascii in our key array!? -> " + key);
        }

        //Get from keystates array.
        //Add counter and set state.
        var original = this.keyStates[key];
        original.state = false;
        original.counter = 0;

        //Invoke events.
        this.keyStates[key] = original;
        this.invokeKey(key, "release");
    }

    /**
     * Mouse wheel event function
     * @param {any} event The event data.
     * @param {any} browser Which browser (deprecated.)
     */
    mouseWheelEvent(event, browser) {
        //Get the scrollwheel movement.
        var dy = event.deltaY / 100;
        var type = "";

        //Detect what actions it is.
        if (dy < 0) {
            type = "up";
        }
        else if (dy > 0) {
            type = "down";
        }

        //Invoke the event.
        this.invokeMouseEvent({
            type: "scroll-" + type,
            magnitude: dy
        });
    }

    /**
     * Update the inputs.
     */
    update() {
        //Loop over all key states.
        for (var i = 0; i < 256; i++)
        {
            //Get key data last frame
            var keyLast = this.keyStatesCopy[i];

            //Get key data this frame.
            var keyNow = this.keyStates[i];

            //Check for key held.
            if (keyLast.state && keyNow.state) {
                this.invokeKey(i, "held");
                this.keyStates[i].counter++;
            }
        }

        //Copy over the values.
        for (var n = 0; n < this.keyStates.length; n++) {
            this.keyStatesCopy[n] = this.keyStates[n];
        }
    }

    invokeKey(key, type) {
        for (var i = 0; i < this.keyCallbacks.length; i++) {
            var data = this.keyCallbacks[i];
            var keyData = this.keyStates[key];

            if (data.keyCode == key && data.type == type) {
                data.callback(keyData.counter);
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