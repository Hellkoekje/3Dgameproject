///<reference path="./../Projectile.js"/>



class Appel extends Projectile {
    constructor(firedFrom) {
        super(firedFrom);

        this.delay = 1000;
       
        this.travelSpeed = 500;
        this.mass = 30;
        this.radius = 5;
        this.damage = 70;
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

        this.hitbox = new ProjectileSphereHitbox(this.mass, this.physicsMaterial, this);
        this.hitbox.position.copy(selfRef.position);
    }

}