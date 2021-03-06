﻿///<reference path="./../Projectile.js"/>
class Bier extends Projectile {
    constructor(firedFrom = Tank) {
        super(firedFrom);
        this.delay = 3500;
    
        this.travelSpeed = 900;
        this.mass = 30;
        //size of the hitbox

        this.radius = 5;
        this.damage = 120;

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

        this.hitbox = new ProjectileSphereHitbox(this.mass,this.physicsMaterial, this);
        this.hitbox.position.copy(selfRef.position);

    }
}