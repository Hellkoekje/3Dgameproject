class GameScene {

    constructor(visualize) {
        this.visualize = visualize;
        this.scene = new THREE.Scene();
        this.constructLights();
        this.constructObjects();
        this.constructEntities();
    }

    getScene() {
        return this.scene;
    }

    remove(obj) {
        this.scene.remove(obj);
    }

    add(obj) {
        this.scene.add(obj);
    }

    constructLights()
    {
        var hemiLight = new THREE.HemisphereLight(0xfff9cc, 0xfff9cc, 0.33);
        hemiLight.position.set(0, 80, 0);
        this.add(hemiLight);

        if (this.visualize) {
            var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
            this.add(hemiLightHelper);
        }

        var dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        dirLight.color.setHSL(0.0, 0, 100);
        dirLight.position.set(-4.714, 10, 4.714);
        dirLight.position.multiplyScalar(50);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.left = -550;
        dirLight.shadow.camera.right = 550;
        dirLight.shadow.camera.top = 550;
        dirLight.shadow.camera.bottom = -550;
        dirLight.shadow.camera.far = 1000;
        dirLight.shadow.bias = -0.0001;
        this.add(dirLight);

        if (this.visualize) {
            var dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 100, 0x333333);
            this.add(dirLightHeper);
        }
    }

    constructObjects()
    {
        //Get dependencies from registry.
        var physics = registry.components.physics;

        //DeKuip level

        var level = new Level();
        level.position.y = -10;
        this.add(level);
        


        //Skybox
        this.add(new THREE.Mesh(new THREE.SphereGeometry(3000, 48, 48),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("Textures/skybox.jpg"),
                    side: THREE.DoubleSide
                }))
        );

        ////Plane
        //var geometry = new THREE.PlaneGeometry(1000, 1000, 1000);
        //var texture = new THREE.TextureLoader().load("Textures/Ground.jpg",
        //    function (texture) {
        //        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        //        texture.offset.set(0, 0);
        //        texture.repeat.set(10, 10);
        //    });

        //var material = new THREE.MeshPhongMaterial({ map: texture });
        //var plane = new THREE.Mesh(geometry, material);
        //plane.castShadow = false;
        //plane.receiveShadow = true;
        //plane.position.x = 0;
        //plane.position.y = -5;
        //plane.position.z = 0;
        //plane.rotation.x = -(Math.PI / 2);
        //plane.rotation.y = 0;
        //plane.rotation.z = 0;
        //this.add(plane);

        //Physics plane
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({
            mass: 0,
            material: physics.getPhysicsMaterial("groundMaterial")
        });

        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        groundBody.position.set(0, -5, 0);

        physics.addBody(groundBody);
    }

    constructEntities() {
        //Get dependencies from registry.
        var physics = registry.components.physics;

        // Friendly tank
        var tank = new Tank("Hidde", true);
        tank.position.x = 0;
        physics.addTank(tank, tank.hitbox, tank.hitbox);
        this.add(tank);

        //enemy tank for label testing
        //this.addAiTank("Sjakie");
        var enemytank = new Tank("Sjakie", false);
        enemytank.position.z = -100;
        physics.addTank(enemytank,enemytank.hitbox,enemytank.hitbox);
        this.add(enemytank);

        var camera = registry.components.camera;
        camera.follow(tank);
    }

    addAiTank(name) {
        // Enemy tank
        var enemytank = new Tank(name, false);
        physics.addTank(enemytank, enemytank.hitbox, enemytank.hitbox);
        this.add(enemytank);
    }
}