class TankHitbox extends CANNON.Body {
    constructor(mass,material,tank) {
        super({ mass: mass, material: material });
        this.tank = tank;
        this.init();

        this.addEventListener("collide",
            function (e) {

                if (e.body.material.name === "projectile") {
                    alert("oi m8 we got shot");
                }

            });

    }

    init() {
        var vec = new CANNON.Vec3(25, 10, 35);
        var shape = new CANNON.Box(vec);
        this.addShape(shape);
        this.position.copy(this.tank.position);
        

    }


}