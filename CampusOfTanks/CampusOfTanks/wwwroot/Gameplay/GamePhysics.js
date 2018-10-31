class GamePhysics {

    constructor(solverIteration, stepRate) {
        this.stepRate = stepRate;
        this.world = new CANNON.World();
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.gravity.set(0, -9.82, 0);
        this.world.solver.iterations = solverIteration;
    }

    update() {

        var scene = gameInstance.fetchComponent("world");

        // Step the physics world
        world.step(1 / 60);

        // Copy coordinates from Cannon.js to Three.js
        for (var i = 0; i < scene.bulletMeshes.length; i++) {
            if (scene.bulletMeshes[i].alive) {
                scene.bulletMeshes[i].position.copy(scene.bulletBodies[i].position);
                scene.bulletMeshes[i].quaternion.copy(scene.bulletBodies[i].quaternion);
            } else {
                scene.remove(scene.bulletMeshes[i]);
                world.remove(scene.bulletBodies[i]);
                scene.bulletMeshes.splice(i, 1);
                scene.bulletBodies.splice(i, 1);
            }

        }

        //Copy coordinates from tank MESH to tank HITBOX, so the cannon.js body follows the mesh instead of the other way around.
        for (var cntr = 0; cntr < scene.tankMeshes.length; cntr++) {
            scene.tankHitboxes[cntr].position.copy(scene.tankMeshes[cntr].position);
            scene.tankHitboxes[cntr].quaternion.copy(scene.tankMeshes[cntr].quaternion);
            scene.tankHitboxes[cntr].position.y += 10;
            scene.tankHitboxes[cntr].position.z += 10;
        }
    }
}