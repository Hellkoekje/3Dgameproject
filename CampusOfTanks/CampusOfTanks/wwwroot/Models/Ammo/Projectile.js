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
        


    }
    biem() {
        var selfref = this;

        selfref.applyMatrix(this.firedFrom.sphere.matrixWorld);
        //Create collidable physics object to "attach" projectile to so we can simulate gravity and collisions.

       
        var physicsMaterial = new CANNON.Material("slipperyMaterial");

        //create collidable sphere object with radius and mass based on projectile subclass property  
      
        var sphereShape = new CANNON.Sphere(this.radius);
        var spherebody = new CANNON.Body({ mass: this.mass, material: physicsMaterial });
        spherebody.addShape(sphereShape);
        spherebody.position.set(this.position.x, this.position.y, this.position.z);



        // add mesh and body to respective lists, so that we can copy the mesh into the body at every frame.
        this.firedFrom.parent.bulletMeshes.push(this);
        this.firedFrom.parent.cannonWorld.addBody(spherebody);
        this.firedFrom.parent.bulletBodies.push(spherebody);

        //shoot the body!
        spherebody.velocity.set(
            this.velocity.x * -this.travelSpeed,
            this.velocity.y,
            this.velocity.z * -this.travelSpeed);
        //remove projectile from scene after 10s
        setTimeout(function () {
                selfref.alive = false;
              

            },
            10000);
        this.firedFrom.parent.add(this);
    }

   
}