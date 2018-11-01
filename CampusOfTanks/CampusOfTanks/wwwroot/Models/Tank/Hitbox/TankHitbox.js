class TankHitbox extends CANNON.Body {
    constructor(mass,material,tank = Tank) {
        super({ mass: mass, material: material });
        this.tank = tank;
        this.init();
        this.selfref = this;

        

    }

    init() {
        var vec = new CANNON.Vec3(20, 10, 30);
        var shape = new CANNON.Box(vec);
        this.addShape(shape);
       // this.position.copy(this.tank.position);
        var selfref = this;
        this.addEventListener("collide",
            function (e) {
                
                if (e.body.material.name === "projectile" && e.body.projectile.firedFrom !== selfref.tank) {
                    

                    //lower our tanks HP by the damage of the projectile
                    this.tank.hitpoints -= e.body.projectile.damage;
                    if (this.tank.hitpoints <= 0) { // if hitpoints is below 0
                        this.tank.alive = false;
                        e.body.projectile.alive = false;
                    } //then he ded

                }

            }); 
    }


}