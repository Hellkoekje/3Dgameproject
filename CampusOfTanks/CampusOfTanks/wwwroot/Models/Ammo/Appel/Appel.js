///<reference path="./../Ammo.js"/>

class Appel extends Ammo {
    constructor(firedFrom) {
        super(firedFrom);

        this.init();
    }

    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Ammo/Appel/");
       
        mtlLoader.load("Apple.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Ammo/Appel/");
            objLoader.load("Apple.obj", function (object) {
                
                object.scale.set(0.04, 0.04, 0.04);
                object.rotation.y = Math.PI / 2;
               
                selfRef.castShadow = true;

                selfRef.add(object);
            });
        });

    }

}