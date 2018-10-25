///<reference path="./../Projectile.js"/>
class Bier extends Projectile {
    constructor(firedFrom = Tank) {
        super(firedFrom);
        this.init();
        this.delay = 7000;
        this.velocity = new THREE.Vector3(-Math.sin(firedFrom.rotation.y), 0, -Math.cos(firedFrom.rotation.y));
        this.travelSpeed = 300;
        this.mass = 15;
        this.radius = 5;
    }

    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Ammo/Bier/");

        mtlLoader.load("Beer.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Ammo/Bier/");
            objLoader.load("Beer.obj", function (object) {

                object.scale.set(3, 3, 3);
                object.rotation.y = Math.PI / 2;

                selfRef.castShadow = true;

                selfRef.add(object);
            });
        });
    }
}