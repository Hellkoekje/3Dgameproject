class Gamemode {

    constructor(aiTanks) {
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
        this.spawnCounter = 0;

        this.aiTanks = aiTanks;
        this.tanks = [];
        this.playerTank = undefined;
    }

    setPlayerTank(tank) {
        this.tanks.push(tank);
        this.playerTank = tank;
    }

    begin() {
        for (var i = 0; i < this.aiTanks; i++) {
            this.spawn("Botmans" + i);
        }
    }

    spawn(name) {
        var gameScene = registry.components.scene;
        var scene = gameScene.getScene();
        var physics = registry.components.physics;
        var spawnPos = this.spawns[this.spawnCounter++];

        var botTank = new AITank(name, false);
        botTank.position.set(spawnPos.x, spawnPos.y, spawnPos.z);
        physics.addTank(botTank, botTank.hitbox, botTank.hitbox);
        scene.add(botTank);

        this.tanks.push(botTank);
    }

}