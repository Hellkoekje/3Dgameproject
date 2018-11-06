class Gamemode {

    constructor(aiTanks) {
        this.waveSpawnRate = 30000;
        this.waveSize = 3;

        this.spawns = [];

        for (var x = -500; x <= 500; x += 200) {
            for (var y = -500; y <= 500; y += 200) {
                this.spawns.push(new THREE.Vector3(x, 0, y));
            }
        }

        //Spawn the tanks outwards first.
        this.spawns = this.spawns.reverse();
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
        var self = this;
        this.wave(self, this.waveSize);

        setInterval(function () {
            self.wave(self, self.waveSize);
        }, this.waveSpawnRate);
    }

    wave(self, size) {
        for (var i = 0; i < size; i++) {
            self.spawn("Botmans");
        }

        self.waveSize++;
    }

    spawn(name) {
        var gameScene = registry.components.scene;
        var scene = gameScene.getScene();
        var physics = registry.components.physics;
        var spawnPos = this.spawns[(this.spawnCounter++) % this.spawns.length];
        var rot = Math.random() * 360;

        var botTank = new AITank(name, false);
        botTank.position.set(spawnPos.x, spawnPos.y, spawnPos.z);
        botTank.rotation.set(0, rot, 0);

        physics.addTank(botTank, botTank.hitbox, botTank.hitbox);
        scene.add(botTank);

        this.tanks.push(botTank);
    }

}