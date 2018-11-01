class ProjectileBoxHitbox extends CANNON.Body {
    constructor(mass, material, projectile) {
        super({ mass: mass, material: material });
        this.projectile = projectile;
        this.init();


    }

    init() {
        var boxShape = new CANNON.Box(this.projectile.size);
        this.addShape(boxShape);
        this.addEventListener("collide",
            function (e) {
                this.projectile.alive = false;


            });

    }
}