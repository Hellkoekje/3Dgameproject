class Level extends THREE.Object3D {
    constructor() {
        super();
        this.init();
    }

    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Level/");

        mtlLoader.load("DeKuip.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Level/");
            objLoader.load("DeKuip.obj", function (object) {
                object.scale.set(50,50,50);
                object.rotation.y = 270 * Math.PI / 180;
                selfRef.castShadow = true;
                selfRef.add(object);
            });
        });
    }
}