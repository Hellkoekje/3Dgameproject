class TankHitbox extends CANNON.Body {
    constructor(mass,material,tank) {
        super({ mass: mass, material: material });
        this.tank = tank;
        this.init();
        var selfref = this;

        this.addEventListener("collide",
            function (e) {
                //Dit triggert ook nog bij het schieten. Het projectiel raakt dan de hitbox van de tank waaruit het geschoten wordt ofzo
                //TODO ^fix
                if (e.body.material.name === "projectile" && e.body.tank !== selfref.tank) {
                    alert("oi m8 we got shot");
                    console.log(e.body);
                    console.log(e.contact);
                    
                }

            });

    }

    init() {
        var vec = new CANNON.Vec3(20, 10, 30);
        var shape = new CANNON.Box(vec);
        this.addShape(shape);
        this.position.copy(this.tank.position);
        

    }


}