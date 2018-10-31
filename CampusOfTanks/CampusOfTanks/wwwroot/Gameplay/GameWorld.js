class GameWorld {

    constructor() {
        this.scene = new THREE.Scene();
    }

    addToScene(obj) {
        this.scene.add(obj);
    }
}