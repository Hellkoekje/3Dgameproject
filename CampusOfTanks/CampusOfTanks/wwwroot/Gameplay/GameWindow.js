class GameWindow {
    constructor(window, document) {
        this.window = window;
        this.document = document;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //Callbacks containers.
        this.resizeCallbacks = [];
        this.keyupCallbacks = [];
        this.keydownCallbacks = [];
    }

    //Events
    listenResize(callback) {
        this.resizeCallbacks.push(callback);
    }

    onResize(width, height) {
        this.width = width;
        this.height = height;
        this.callCallbacksForEvent(this.resizeCallbacks, { width: width, height: height });
    }

    callCallbacksForEvent(array, data) {
        for (var i = 0; i < array.length; i++) {
            var callback = array[i];

            if (typeof (callback) === "function") {
                callback(eventData);
            }
        }
    }

    getWindowWidth() {
        return this.width;
    }

    getWindowHeight() {
        return this.height;
    }

    registerRenderer(renderer) {
        this.document.body.appendChild(renderer.domElement);
    }


}