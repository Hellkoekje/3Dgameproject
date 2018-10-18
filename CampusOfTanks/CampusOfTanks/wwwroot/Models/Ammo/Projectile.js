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

   
}