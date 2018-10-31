class ProjectileHitbox extends CANNON.Body {
    constructor(mass, material, projectile) {
        super({ mass: mass, material: material });
        this.init();
        this.projectile = projectile;
     
        


    }

    init() {
        var sphereShape = new CANNON.Sphere(this.radius);
        this.addShape(sphereShape);
        //create collidable sphere object with radius and mass based on projectile subclass property  
        this.addEventListener("collide", function (e) {

            // alert("biem");


        });
    }

}