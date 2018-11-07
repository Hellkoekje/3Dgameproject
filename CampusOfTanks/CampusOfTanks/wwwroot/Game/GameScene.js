//Represents the game scene and adds all the objects.
class GameScene {

    /**
     * Constructor
     * @param {any} visualize Should we include the helpers?
     */
    constructor(visualize) {
        this.visualize = visualize;
        this.scene = new THREE.Scene();

        //Add all the object
        this.constructLights();
        this.constructObjects();
        this.constructEntities();
    }

    /**
     * Gets the THREEjs scene object.
     * @returns {THREE.Scene} The scene object.
     */
    getScene() {
        return this.scene;
    }

    /**
     * Remove and object from the scene.
     * @param {Object3D} obj The object we want to remove.
     */
    remove(obj) {
        this.scene.remove(obj);
    }

    /**
     * Add an object to the scene.
     * @param {Object3D} obj Object to add.
     */
    add(obj) {
        this.scene.add(obj);
    }

    /**
     * Add all the lights to the scene.
     */
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

    /**
     *  Add all the objects to the scene. 
    */
    constructObjects()
    {
        //Get dependencies from registry.
        var physics = registry.components.physics;

        //DeKuil level
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

    /**
     * Add all the entities (such as players and entities).
     */
    constructEntities() {
        //Get dependencies from registry.
        var physics = registry.components.physics;
        var url = new URLSearchParams(window.location.search);
        var uname = url.get("username");

        // Friendly tank
        var tank = new Tank(uname, true);
        tank.position.x = 0;
        physics.addTank(tank, tank.hitbox, tank.hitbox);
        this.add(tank);

        //RIP Sjakie 2018-2018

        //Camera needs to follow player tank.
        var camera = registry.components.camera;
        camera.follow(tank);
    }
}