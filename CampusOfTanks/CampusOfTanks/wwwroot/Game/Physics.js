class Physics {

    constructor(settings) {
        this.settings = settings;

        //Setup world object.
        this.world = new CANNON.World();
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.gravity.set(0, -settings.gravitationalPull, 0);
        this.world.solver.iterations = settings.solverIterations;

        this.bulletMeshes = [];
        this.bulletHitboxes = [];
        this.tankMeshes = [];
        this.tankHitboxes = [];

        this.physicsMaterials = [];
    }

    addBullet(mesh, hitbox, body) {
        this.bulletMeshes.push(mesh);
        this.bulletHitboxes.push(hitbox);
        this.world.addBody(body);
    }

    addTank(mesh, hitbox, body) {
        this.tankMeshes.push(mesh);
        this.tankHitboxes.push(hitbox);
        this.world.addBody(body);
    }

    addBody(body) {
        this.world.addBody(body);
    }

    addPhysicsMaterial(name, material) {
        this.physicsMaterials[name] = material;
        this.world.addContactMaterial(material);
    }

    getPhysicsMaterial(name) {
        return this.physicsMaterials[name];
    }

    update() {
        this.world.step(1 / 60);

        // Copy coordinates from Cannon.js to Three.js
        for (var i = 0; i < this.bulletMeshes.length; i++) {
            if (this.bulletMeshes[i].alive) {
                this.bulletMeshes[i].position.copy(this.bulletHitboxes[i].position);
                this.bulletMeshes[i].quaternion.copy(this.bulletHitboxes[i].quaternion);
            } else {

                //TODO: Remove from scene
                //this.remove(this.bulletMeshes[i]);

                this.world.remove(this.bulletBodies[i]);
                this.bulletMeshes.splice(i, 1);
                this.bulletHitboxes.splice(i, 1);
            }
        }

        //Copy coordinates from tank MESH to tank HITBOX, so the cannon.js body follows the mesh instead of the other way around.
        for (var n = 0; n < this.tankMeshes.length; n++) {

            var body = this.tankHitboxes[n];
            var tank = this.tankMeshes[n];

            if (tank.alive) {
                body.position.copy(tank.position);
                body.quaternion.copy(tank.quaternion);
                body.position.y += 5;
                // scene.tankHitboxes[cntr].position.z += 10;
                tank.cubemesh.position.copy(tank.hitbox.position);
                tank.cubemesh.quaternion.copy(tank.hitbox.quaternion);
            }
            else {
                this.tankMeshes.splice(n, 1);
                this.tankHitboxes.splice(n, 1);

                //TODO: Remove tank from scene
                //this.remove(tank);
                this.world.remove(body);
            }
        }
    }
}