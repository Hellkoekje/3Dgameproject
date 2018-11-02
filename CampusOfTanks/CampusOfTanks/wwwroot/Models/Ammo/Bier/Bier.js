///<reference path="./../Projectile.js"/>
class Bier extends Projectile {
    constructor(firedFrom = Tank) {
        super(firedFrom);
        this.delay = 7000;
    
        this.travelSpeed = 500;
        this.mass = 30;
        //size of the hitbox
        this.size = new CANNON.Vec3(1.75, 2.5, 1.75);
        this.damage = 20;
        this.init();

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

        this.hitbox = new ProjectileBoxHitbox(this.mass,this.physicsMaterial, this);
        this.hitbox.position.copy(selfRef.position);

    }
}