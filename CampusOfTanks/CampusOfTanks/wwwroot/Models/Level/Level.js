class Level extends THREE.Object3D {
    constructor() {
        super();
        this.init();
    }

    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Level/");

        mtlLoader.load("level2.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Level/");
            objLoader.load("level2.obj", function (object) {
                object.scale.set(750, 750, 750);
                object.position.set(0, 196, 0);
                object.rotation.y = 270 * Math.PI / 180;
                selfRef.castShadow = true;
                selfRef.add(object);
            });
        });
    }
}