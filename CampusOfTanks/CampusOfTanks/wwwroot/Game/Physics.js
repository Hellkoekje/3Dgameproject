//Class for doing anything physics related.
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

    /**
     *  Add a new bullet to the game
     * @param {any} mesh The bullet mesh
     * @param {any} hitbox the bullet hitbox
     * @param {any} body the body of the bullet.
     */
    addBullet(mesh, hitbox, body) {
        this.world.addBody(body);
        this.bulletMeshes.push(mesh);
        this.bulletHitboxes.push(hitbox);
        
    }

    /**
     *  Add a new tank to the game
     * @param {any} mesh The tank mesh
     * @param {any} hitbox the tank hitbox
     * @param {any} body the body of the tank.
     */
    addTank(mesh, hitbox, body) {
        this.world.addBody(body);
        this.tankMeshes.push(mesh);
        this.tankHitboxes.push(hitbox);
        
    }

    /**
     *  Add a physics body
     * @param {any} body the body to add.
     */
    addBody(body) {
        this.world.addBody(body);
    }

    /**
     * Add a new physics material
     * @param {any} name name of the material
     * @param {any} material instance of the material.
     */
    addPhysicsMaterial(name, material) {
        this.physicsMaterials[name] = material;
        this.world.addContactMaterial(material);
    }

    /**
     * Get the physics material based on the name.
     * @param {any} name Name of the material we want to look for.
     * @returns {any} The material instance
     */
    getPhysicsMaterial(name) {
        return this.physicsMaterials[name];
    }

    /**
     * Update the physics.
     */
    update() {
        //Step the world 1 tick forward.
        this.world.step(1 / 60);

        var scene = registry.components.scene;
        var sceneObj = scene.getScene();

        // Copy coordinates from Cannon.js to Three.js
        for (var i = 0; i < this.bulletMeshes.length; i++) {
            if (this.bulletMeshes[i].alive) {
                this.bulletMeshes[i].position.copy(this.bulletHitboxes[i].position);
                this.bulletMeshes[i].quaternion.copy(this.bulletHitboxes[i].quaternion);
            } else {
                sceneObj.remove(this.bulletMeshes[i]);
                this.world.remove(this.bulletHitboxes[i]);
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
            }
            else {
                this.tankMeshes.splice(n, 1);
                this.tankHitboxes.splice(n, 1);
                sceneObj.remove(tank);
                this.world.remove(body);
            }
        }
    }
}