//The gamemode dictates how the gameplays out.
class Gamemode {

    constructor() {
        //Enemy tank wave variables.
        this.waveSpawnRate = 20000;
        this.waveSize = 3;

        //Spawns + populating them.
        this.spawns = [];
        for (var x = -500; x <= 500; x += 200) {
            for (var y = -500; y <= 500; y += 200) {
                this.spawns.push(new THREE.Vector3(x, 0, y));
            }
        }

        //Spawn the tanks outwards first.
        this.spawns = this.spawns.reverse();

        //Enemy tanks and player tank.
        this.tanks = [];
        this.playerTank = undefined;
    }

    /**
     * Tell the gamemode who the player tank is.
     * @param {any} tank
     */
    setPlayerTank(tank) {
        this.tanks.push(tank);
        this.playerTank = tank;
    }

    /*
     * Start spawning the waves of tanks.
    */
    begin() {
        var self = this;
        this.wave(self, this.waveSize);

        setInterval(function () {
            self.wave(self, self.waveSize);
        }, this.waveSpawnRate);
    }

    /**
     * Make a wave of tanks
     * @param {any} self Reference to the gamemode, because callbacks.
     * @param {any} size Size of the wave.
     */
    wave(self, size) {
        for (var i = 0; i < size; i++) {
            self.spawn("Botmans");
        }

        self.waveSize++;
    }

    /**
     * Spawn an AI tank.
     * @param {any} name Name of the tank
     */
    spawn(name) {
        var gameScene = registry.components.scene;
        var scene = gameScene.getScene();
        var physics = registry.components.physics;

        //Find a spawn
        var spawnPos = this.spawns[math.range(0, this.spawns.length)];

        //Assign random rotation.
        var rot = Math.random() * 360;

        //Create an AI tank.
        var botTank = new AITank(name, false);
        botTank.position.set(spawnPos.x, spawnPos.y, spawnPos.z);
        botTank.rotation.set(0, rot, 0);

        physics.addTank(botTank, botTank.hitbox, botTank.hitbox);
        scene.add(botTank);

        //Store the tank.
        this.tanks.push(botTank);
    }

}