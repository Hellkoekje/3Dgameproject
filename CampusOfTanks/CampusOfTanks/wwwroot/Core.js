gameInstance = new Game();

window.onload = function () {

    var gameWindow = new GameWindow(window, document);
    var gameCamera = new GameCamera();
    var gameInput = new GameInput();
    var gameRenderer = new GameRenderer(gameWindow);

    //Register all the events.
    window.addEventListener('resize', () => {
        gameWindow.onResize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("keydown", (keyEvent) => {
        gameInput.onKeydown(keyEvent);
    });

    window.addEventListener("keyup", (keyEvent) => {
        gameInput.onKeydown(keyEvent);
    });

    //Initialize the "game" object.
    gameInstance.setGameWindow(gameWindow);
    gameInstance.setGameRenderer(gameRenderer, 30);
    gameInstance.setGameInput(gameInput);
    gameInstance.setReady();

    //gameRenderer.createRenderer();
    //gameRenderer.renderFrame();























    var camera, scene, renderer, world;
    var net;

    var cameraControls;
    //var TankDirection = 270 * Math.PI / 180;
    var TankDirection = 0;
    var angularSpeed = 0.5;
    var TankSpeed = 0.5;
    var TankIsRotatingLeft = 0;
    var TankIsRotatingRight = 0;
    var TankIsMovingForward = 0;
    var TankIsMovingBackwards = 0;
    var TankBackwardsSpeed = TankSpeed * 0.4;
    var tank, enemytank;



    function init() {

        //Cannon init
        world = new CANNON.World();
        world.broadphase = new CANNON.NaiveBroadphase();
        world.gravity.set(0, -9.82, 0);
        world.solver.iterations = 20;



        //THREE inits

        scene = new THREE.Scene();
        //VISUAL meshes of bullets(apple,egg models.)
        scene.bulletMeshes = [];
        //actual collidable physics objects (spheres) placed inside of visual mesh.
        scene.bulletBodies = [];
        scene.tankMeshes = [];
        scene.tankHitboxes = [];
        scene.cannonWorld = world;
        //tanks
        //init tanks
        tank = new Tank("Hidde");

        enemytank = new Tank("Sjakie");

        //add tank mesh and hitbox to array for physics logic
        scene.tankMeshes.push(tank);
        scene.tankHitboxes.push(tank.hitbox);
        //add hitbox body to the CANNON world so we can apply physics
        world.addBody(tank.hitbox);

        scene.add(tank);
        scene.add(tank.cubemesh);

        tank.position.x = 0;

        //enemy tank for hitbox tests
        scene.add(enemytank);
        enemytank.position.x = 0;
        enemytank.position.z = -100;
        scene.tankMeshes.push(enemytank);
        scene.tankHitboxes.push(enemytank.hitbox);
        world.addBody(enemytank.hitbox);


        camera = new THREE.PerspectiveCamera(70, window.innerwidth / window.innerheight, 1, 1500);
        cameraControls = new THREE.OrbitControls(camera, renderer);
        cameraControls.center = new THREE.Vector3(
            tank.position.x,
            tank.position.y,
            tank.position.z);

        camera.rotation.x = 90 * Math.PI / 180;
        camera.position.set(tank.position.x - 75, tank.position.y + 50, tank.position.z);
        camera.lookAt(tank.position);
        cameraControls.update();

        var controls = new THREE.ObjectControls(camera, window.domElement, tank);
        controls.setDistance(8, 200); // set min - max distance for zoom
        controls.setZoomSpeed(1); // set zoom speed

        //verlichting
        //hemilight + derictional light voor een realistische belichting

        hemiLight = new THREE.HemisphereLight(0x7F7F7F, 0xFFFFFF, 0.8);
        hemiLight.position.set(0, 80, 0);
        scene.add(hemiLight);

        hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
        scene.add(hemiLightHelper);

        dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        dirLight.color.setHSL(0.0, 0, 100);
        dirLight.position.set(-4.714, 10, 4.714);
        dirLight.position.multiplyScalar(50);
        scene.add(dirLight);
        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        dirLight.shadow.camera.left = -550;
        dirLight.shadow.camera.right = 550;
        dirLight.shadow.camera.top = 550;
        dirLight.shadow.camera.bottom = -550;
        dirLight.shadow.camera.far = 1000;
        dirLight.shadow.bias = -0.0001;


        //dit is de helper voor de directional light.
        dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 100, 0xFFFFFF);
        scene.add(dirLightHeper);

        //dit is de camera helper
        var helper = new THREE.CameraHelper(dirLight.shadow.camera);
        scene.add(helper);



        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('keydown', key_down);
        window.addEventListener('keyup', key_up);


        //Plane stuff.
        var geometry = new THREE.PlaneGeometry(1000, 1000, 1000);

        //Repeat plane texture! :D
        var texture = new THREE.TextureLoader().load("Textures/Ground.jpg",
            function (texture) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(10, 10);
            });

        var material = new THREE.MeshPhongMaterial({ map: texture });
        var plane = new THREE.Mesh(geometry, material);

        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.position.x = 0;
        plane.position.y = -5;
        plane.position.z = 0;
        plane.rotation.x = -(Math.PI / 2);
        plane.rotation.y = 0;
        plane.rotation.z = 0;
        scene.add(plane);






        //Skybox

        scene.add(
            new THREE.Mesh(new THREE.SphereGeometry(750, 12, 12),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("Textures/skybox.jpg"),
                    side: THREE.DoubleSide
                }))
        );





        /* cannonjs test
         */
        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3 // restitution
        );






        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        // Create a plane
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ mass: 0, material: physicsMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        groundBody.position.set(0, -5, 0);
        world.addBody(groundBody);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function moveForward(speed) {

            var delta_z = speed * Math.cos(TankDirection);
            var delta_x = speed * Math.sin(TankDirection);

            var new_x = camera.position.x + delta_x;
            var new_z = camera.position.z + delta_z;

            camera.position.x = new_x;
            camera.position.z = new_z;

            var new_dx = tank.position.x + delta_x;
            var new_dz = tank.position.z + delta_z;
            tank.position.x = new_dx;
            tank.position.z = new_dz;
            camera.lookAt(tank.position);
        }

        function setTankDirection() {
            tank.rotation.y = TankDirection;
            camera.lookAt(tank.position);

        }

        function UpdateTank() {
            if (TankIsRotatingLeft) { // rotate left
                TankDirection += angularSpeed * Math.PI / 180;
            }
            if (TankIsRotatingRight) { // rotate right
                TankDirection -= angularSpeed * Math.PI / 180;
            }
            if (TankIsRotatingRight || TankIsRotatingLeft) {
                setTankDirection();
                return;
            }
            if (TankIsMovingForward) { // go forward
                moveForward(TankSpeed);
                return;
            }
            if (TankIsMovingBackwards) { // go backwards
                moveForward(-TankBackwardsSpeed);
                return;
            }
        }

        var a = false;

        function key_down(event) {
            keys = { LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83, SPACE: 32, RELOAD: 82 };

            switch (event.keyCode) {
                case keys.UP:
                    TankIsMovingForward = 1;
                    break;
                case keys.BOTTOM:
                    TankIsMovingBackwards = 1;
                    break;
                case keys.LEFT:
                    TankIsRotatingLeft = 1;
                    break;
                case keys.RIGHT:
                    TankIsRotatingRight = 1;
                    break;
                case keys.SPACE:
                    tank.fire();
                    break;
                case keys.RELOAD:
                    tank.cycleAmmo();
                    break;
            }
        }

        function key_up() {
            TankIsMovingForward = 0;
            TankIsMovingBackwards = 0;
            TankIsRotatingLeft = 0;
            TankIsRotatingRight = 0;
            TankGoesUp = 0;
            TankGoesDown = 0;
        }

        TankIsMovingForward = 0;
        TankIsMovingBackwards = 0;
        TankIsRotatingLeft = 0;
        TankIsRotatingRight = 0;
        TankGoesUp = 0;
        TankGoesDown = 0;

        function updatePhysics() {
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
                var body = scene.tankHitboxes[cntr];
                var tank = scene.tankMeshes[cntr];
                if (tank.alive) {

                    body.position.copy(tank.position);
                    body.quaternion.copy(tank.quaternion);
                    body.position.y += 5;
                    // scene.tankHitboxes[cntr].position.z += 10;
                    tank.cubemesh.position.copy(tank.hitbox.position);
                    tank.cubemesh.quaternion.copy(tank.hitbox.quaternion);

                }
                else {
                    scene.tankMeshes.splice(cntr, 1);
                    scene.tankHitboxes.splice(cntr, 1);
                    scene.remove(tank);
                    world.remove(body);

                }

            }

        }

        function render() {
            updatePhysics();
            UpdateTank();
            requestAnimationFrame(render);
            camera.lookAt(tank.position);
            cameraControls.update();
            renderer.render(scene, camera);
        }

        render();
    }

    
    init();
}


