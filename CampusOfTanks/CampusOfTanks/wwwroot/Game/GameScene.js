class GameScene {

    constructor() {
        this.scene = new THREE.Scene();
    }

    get() {
        return this.scene;
    }

    remove(obj) {
        this.scene.remove(obj);
    }

    add(obj) {
        this.scene.add(obj);
    }
}