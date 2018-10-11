class Ei extends Ammo {
    constructor(firedFrom) {
        super(firedFrom);
        this.type = "ei";
        this.init();

    }


    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Ammo/Ei/");
        
        mtlLoader.load("Egg_01.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Ammo/Ei/");
            objLoader.load("Egg_01.obj", function (object) {

                object.scale.set(0.75, 0.75, 0.75);
                object.rotation.y = Math.PI / 2;

                selfRef.castShadow = true;

                selfRef.add(object);
            });
        });
    }

}