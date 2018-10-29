///<reference path="./../Projectile.js"/>
class Bier extends Projectile {
    constructor(firedFrom = Tank) {
        super(firedFrom);
        this.init();
        this.delay = 7000;
        this.velocity = new THREE.Vector3(-Math.sin(firedFrom.rotation.y), 0, -Math.cos(firedFrom.rotation.y));
        this.travelSpeed = 300;
        this.mass = 15;
        this.radius = 7;
        firedFrom.sphere.position.set(this.position.x + 9, this.position.y + 11, this.position.z + 35);
    }

    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Ammo/Bier/");

        mtlLoader.load("Bier.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Ammo/Bier/");
            objLoader.load("Bier.obj", function (object) {

                object.scale.set(0.4, 0.4, 0.4);
                object.rotation.y = 270*Math.PI/180;

                selfRef.castShadow = true;

                selfRef.add(object);
            });
        });
    }
}