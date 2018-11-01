//Inherits from and acts like a THREE.Group(), but subclasses will have custom properties like a damage,range and associated model-loading code.

class Projectile extends THREE.Object3D {

    //Constructor takes 1 param, the tank that it has been fired from. Might not be needed but added just in case.

    constructor(firedFrom = Tank) {
        super();
        this.firedFrom = firedFrom;
        this.mass;
        this.radius;
        this.castShadow = true;
  
        this.alive = true;
        
        this.physicsMaterial = new CANNON.Material("projectile");
        this.hitbox;
        this.damage;

    }

    biem() {
        var selfref = this;

        selfref.applyMatrix(this.firedFrom.sphere.matrixWorld);
        this.hitbox.position.copy(selfref.position);
<<<<<<< HEAD

         var physx = registry.components.physics;
        physx.addBullet(this, this.hitbox, this.hitbox);
=======
        
        
        // add mesh and body to respective lists, so that we can copy the mesh into the body at every frame.
        this.firedFrom.parent.bulletMeshes.push(this);
        this.firedFrom.parent.cannonWorld.addBody(this.hitbox);
        this.firedFrom.parent.bulletBodies.push(this.hitbox);
>>>>>>> 63db303710e0b5fd3ffefda36d4adb837900f710

        //shoot the body!
        this.hitbox.velocity.set(
            this.velocity.x * -this.travelSpeed,
            this.velocity.y,
            this.velocity.z * -this.travelSpeed);

        //remove projectile from scene after 10s
        setTimeout(function () {
            selfref.alive = false;
        }, 10000);

        this.firedFrom.parent.add(this);
    }

   
}