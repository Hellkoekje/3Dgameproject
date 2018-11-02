class ProjectileSphereHitbox extends CANNON.Body {
    constructor(mass, material, projectile) {
        super({ mass: mass, material: material });
        this.projectile = projectile;
        this.init();
     
        


    }

    init() {
        var sphereShape = new CANNON.Sphere(this.projectile.radius);
        this.addShape(sphereShape);
        //create collidable sphere object with radius and mass based on projectile subclass property  
        this.addEventListener("collide", function (e) {
            //upon collision remove this
            this.projectile.alive = false;
            console.log(e.body);

        });
        
    }

}