class Gamemode {

    constructor() {
        this.spawnCounter = 0;

        this.spawns = [];

        this.spawns.push(new THREE.Vector3(500, 0, 0));
        this.spawns.push(new THREE.Vector3(-500, 0, 0));
        this.spawns.push(new THREE.Vector3(500, 0, 500));
        this.spawns.push(new THREE.Vector3(-500, 0, 500));
        this.spawns.push(new THREE.Vector3(500, 0, -500));
        this.spawns.push(new THREE.Vector3(-500, 0, -500));
        this.spawns.push(new THREE.Vector3(500, 0, 200));
        this.spawns.push(new THREE.Vector3(-500, 0, 200));
        this.spawns.push(new THREE.Vector3(500, 0, -200));
        this.spawns.push(new THREE.Vector3(-500, 0, -200));
        this.spawns.push(new THREE.Vector3(200, 0, 500));
        this.spawns.push(new THREE.Vector3(-200, 0, 500));
        this.spawns.push(new THREE.Vector3(200, 0, -500));
        this.spawns.push(new THREE.Vector3(-200, 0, -500));


        this.begin();
    }

    begin() {

        var gameScene = registry.components.scene;
        var scene = gameScene.getScene();
        var physics = registry.components.physics;

        for (var i = 0; i < this.spawns.length; i++) {
            console.log(i);
            var spawnPos = this.spawns[i];

            var botTank = new Tank("Botmans" + i, false);
            botTank.position.set(spawnPos.x, spawnPos.y, spawnPos.z);

            physics.addTank(botTank, botTank.hitbox, botTank.hitbox);
            scene.add(botTank);
        }
    }

}