class AITank extends Tank {

    constructor(username, isLocal) {
        super(username, false);
        this.registerUpdate(() => { this.updateAi(); });

        this.target = undefined;
        this.state = "next";
        this.stateData = 0;

        this.turnSpeed = 5;
        this.movementSpeed = 133;
    }

    updateAi() {
        //Don't update AI if the AI is dead.
        if (this.isDead()) {
            return;
        }

        //Select an suitable
        if (!this.target) {
            this.target = this.selectTarget();
            return;
        }

        if (this.target.isDead()) {
            this.state = "next";
            this.stateData = 0;
            this.target = this.selectTarget();
            return;
        }

        var angle = this.faceTarget();
        var distance = this.distanceToTarget();
        var rng = Math.random();

        //State selection
        if (this.state === "next") {
            this.stateData = 0;

            if (distance > 1000) {
                if (rng < 0.33) {
                    this.state = "move500";
                }
                else if (rng > 0.33 && rng < 0.66) {
                    this.state = "move300";
                }
                else {
                    this.state = "shootBier";
                }
            }
            else if (distance > 500 && distance <= 1000) {

               if (rng > 0.0 && rng < 0.6) {
                    this.state = "shootBier";
                }
                else {
                    this.state = "move300";
                }
            }
            else if (distance > 300 && distance <= 500) {
                if (rng > 0.0 && rng < 0.75) {
                    this.state = "shootApple";
                }
                else {
                    this.state = "move200";
                }
            }
            else if (distance < 300) {
                this.state = "shootEgg";
            }
        }
        else {
            this.computeState(distance, angle);
        }
    }

    selectTarget() {
        var gamemode = registry.components.gamemode;
        return gamemode.playerTank;
        //var tanks = gamemode.tanks;
        //var pos = this.position;

        //var closest = undefined;
        //var closestDist = -1;

        //for (var i = 0; i < tanks.length; i++) {
        //    var tank = tanks[i];

        //    //Don't select ourselves.
        //    if (tank.uuid == this.uuid) {
        //        continue;
        //    }

        //    //Don't select dead bois
        //    if (tank.isDead()) {
        //        continue;
        //    }

        //    var enemyPos = tank.position;
        //    var dist = pos.distanceTo(enemyPos);

        //    if (closestDist == -1 || dist < closestDist) {
        //        closest = tanks[i];
        //        closestDist = dist;
        //    }
        //}

        //return closest;
    }

    distanceToTarget() {
        return this.target.position.distanceTo(this.position);
    }

    faceTarget() {

        var forward = new THREE.Vector3(1, 0, 0);
        forward.applyQuaternion(this.quaternion);
        forward = forward.normalize();

        var targetPosition = new THREE.Vector3(0, 0, 0);
        targetPosition.copy(this.target.position);

        var myPosition = new THREE.Vector3(0, 0, 0);
        myPosition.copy(this.position);

        var direction = targetPosition.sub(myPosition).normalize();
        var dot = forward.dot(direction);

        return dot;
    }

    computeState(dist, angle) {
        var stateDone = false;

        switch (this.state) {
            case "move500":
                stateDone = this.moveToDistance(500, dist, angle);
                break;
            case "move300":
                stateDone = this.moveToDistance(300, dist, angle);
                break;
            case "move200":
                stateDone = this.moveToDistance(200, dist, angle);
                break;
            case "shootBier":
                stateDone = this.shootTarget(2, dist, angle);
                break;
            case "shootApple":
                stateDone = this.shootTarget(0, dist, angle);
                break;
            case "shootEgg":
                stateDone = this.shootTarget(1, dist, angle);
                break;
            case "flee":
                stateDone = this.flee(dist, angle);
                break;
        }

        if (stateDone) {
            this.state = "next";
        }
    }

    moveToDistance(targetDist, distance, angle) {
        //Did we reach the desired distance yet?
        if (distance <= targetDist) {
            return true;
        }

        //The angle from the target, 0 if we directly look at them
        //      Negative means it's left of us
        //      Positive means it's right of us.
        var angleDelta = Math.abs(angle);

        //Slowly rotate towards target and move towards it.
        if (angleDelta < 0.25) {
            if (angle < 0.05) {
                this.turn(-1, this.deltaTime);
            }
            else if (angle > 0.05) {
                this.turn(1, this.deltaTime);
            }

            this.move(1, this.deltaTime);
        }
        //Our angles are widly different, compensate first before moving.
        else if (angleDelta > 0.25) {
            if (angle < 0.05) {
                this.turn(-1, this.deltaTime);
            }
            else if (angle > 0.05) {
                this.turn(1, this.deltaTime);
            }
        }

        return false;
    }

    shootTarget(type, dist, angle) {

        var angleDelta = Math.abs(angle);
        var spread = Math.random() / 10;

        //Are we looking close enough to shoot?
        if (angleDelta < (0.06 + spread)) {
            this.ammoSelected = type;
            this.fire();
            this.stateData++;
        }
        //We aren't, so rotate closer.
        else {
            if (angle < 0.01) {
                this.turn(-1, this.deltaTime);
            }
            else if (angle > 0.01) {
                this.turn(1, this.deltaTime);
            }
        }

        if (type == 1) {
            return this.stateData == 10 || dist > 300; //shoot 10x
        }
        else if (type == 2) {
            return this.stateData >= 1 || dist > 500; //Shoot 1x;
        }
        else {
            return this.stateData >= 1 || dist > 1000; //Shoot 1x;
        }

    }
}