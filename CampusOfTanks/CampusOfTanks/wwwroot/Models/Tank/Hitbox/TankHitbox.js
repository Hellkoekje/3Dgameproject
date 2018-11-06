class TankHitbox extends CANNON.Body {
    constructor(mass, material, tank = Tank) {
        super({ mass: mass, material: material });
        this.tank = tank;
        this.init();
        this.selfref = this;
        this.collidable = false;
        this.damageablebycollision = true;
        var selfref = this;
        //delay collisions for a few secs after game starts, for some reason collisions were triggering before the tanks were spawned at the right location.
        setTimeout(function() {
                selfref.collidable = true;

            },
            7500);
    }

    init() {
        var vec = new CANNON.Vec3(20, 15, 30);
        var shape = new CANNON.Box(vec);
        this.addShape(shape);
        this.position.copy(this.tank.position);
        var selfref = this;
        this.addEventListener("collide",
            function (e) {
                if (this.collidable) {
                    if (e.body.material !== null) {
                        if (e.body.material.name === "projectile" && e.body.projectile.firedFrom !== selfref.tank) {


                            //lower our tanks HP by the damage of the projectile
                            this.tank.hitpoints -= e.body.projectile.damage;
                            this.tank.updateLabel();
                            if (this.tank.hitpoints <= 0) { // if hitpoints is below 0
                                this.tank.alive = false;
                                e.body.projectile.alive = false;
                            } //then he ded

                        } else if (e.body.material.name === "tankhitbox" && e.body.tank !== selfref.tank) {
                            if (this.damageablebycollision) {
                                this.tank.hitpoints -= 10;
                                this.tank.updateLabel();
                                if (this.tank.hitpoints <= 0) { // if hitpoints is below 0
                                    this.tank.alive = false;
                                }
                                this.damageablebycollision = false;
                                setTimeout(function() {
                                        selfref.damageablebycollision = true;
                                    },
                                    2000);
                            }
                            

                        }
                    }
                }
            });
    }


}