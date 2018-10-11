class MonsterEnergy extends Ammo {
    constructor(firedFrom = Tank) {
        super(firedFrom);
        this.init();
    }

    init() {
        var selfref = this;
        var loader = new THREE.GLTFLoader();
        loader.setPath("Models/Ammo/Monster Energy/");

        loader.load(
            "scene.gltf",
            function (gltf) {

                selfref.add(gltf);

            }
                 );
    }
}