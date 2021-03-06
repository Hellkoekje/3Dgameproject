﻿///<reference path="./../Projectile.js"/>
class Ei extends Projectile {
    constructor(firedFrom) {
        super(firedFrom);
        
 
      
        this.delay = 50;

        this.travelSpeed = 800;
        this.mass = 30;
        this.radius = 2;
        this.damage = 10;
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

                object.scale.set(0.05, 0.05, 0.05);
                object.rotation.y = Math.PI / 2;

                selfRef.castShadow = true;

                selfRef.add(object);
            });
        });
        this.hitbox = new ProjectileSphereHitbox(this.mass, this.physicsMaterial, this);
        this.hitbox.position.copy(selfRef.position);
    }

}