registry = new Registry();

window.onload = function () {

    var camera, scene, renderer, world;
    var net;

    var cameraControls;
    var tank, enemytank;



    function init() {
        scene = new THREE.Scene();

        var physics = new Physics({
            solverIterations: 20,
            gravitationalPull: 9.81
        });

        registry.addComponent("physics", physics);

        var input = new Input();
        window.addEventListener('keydown', (e) => input.keyDownEvent(e));
        window.addEventListener('keyup', (e) => input.keyUpEvent(e));

        registry.addComponent("input", input);

        // Friendly tank
        tank = new Tank("Hidde", true);
        tank.position.x = 0;
        physics.addTank(tank, tank.hitbox, tank.hitbox);
        scene.add(tank);


        // Enemy tank
        enemytank = new Tank("Sjakie", false);
        enemytank.position.x = 0;
        enemytank.position.z = -100;
        physics.addTank(enemytank, enemytank.hitbox, enemytank.hitbox);
        scene.add(enemytank);

        //Setup camera and controls.
        var aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(70, aspect, 1, 1500);
        camera.rotation.x = 90 * Math.PI / 180;
        cameraControls = new THREE.OrbitControls(camera, renderer);
        cameraControls.update();
        var controls = new THREE.ObjectControls(camera, window.domElement, tank);
        controls.setDistance(8, 200); // set min - max distance for zoom
        controls.setZoomSpeed(1); // set zoom speed

        // Lights!
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

        // Camera
        var helper = new THREE.CameraHelper(dirLight.shadow.camera);
        scene.add(helper);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Events 
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        //window.addEventListener('keydown', key_down);
        //window.addEventListener('keyup', key_up);

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

        //muziek troep
        var listener = new THREE.AudioListener();
        camera.add(listener);

        var sound = new THREE.Audio(listener);

        var audioLoader = new THREE.AudioLoader();
        audioLoader.load('/sounds/Iron.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.025);
            sound.play();
        });

        //dat.gui
       
        var guiControls = new function () {

            this.setVolume = 0.025;
            this.RotationZ = 0.01;
            this.RotationY = 0.01;
        }
        var datGUI = new dat.GUI();
        datGUI.add(guiControls, 'setVolume', 0, 5);
        datGUI.add(guiControls, 'RotationY', 0, 1);
        datGUI.add(guiControls, 'RotationZ', 0, 1);

        //Skybox
        scene.add(
            new THREE.Mesh(new THREE.SphereGeometry(750, 12, 12),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("Textures/skybox.jpg"),
                    side: THREE.DoubleSide
                }))
        );

        //Slippery physics material.
        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, 0.0, 0.3);
        physics.addPhysicsMaterial("slippery", physicsContactMaterial);


        // Create a plane
        var groundShape = new CANNON.Plane();

        var groundBody = new CANNON.Body({
            mass: 0,
            material: physics.getPhysicsMaterial("slippery")
        });

        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        groundBody.position.set(0, -5, 0);

        physics.addBody(groundBody);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function ShowAmmo(){
            if (tank.ammoSelected == 0) {
                console.log("apple");

            }
            if (tank.ammoSelected == 1) {
                console.log("ei");

            }
            if (tank.ammoSelected == 2) {
                console.log("bier");

            }
        }

        function render() {   

            setTimeout(function () {
                requestAnimationFrame(render);
            }, 1000 / 30);

            input.update();
            physics.update();

            tank.add(camera);
            camera.position.z = -50;
            cameraControls.update();
            camera.position.y = 30;
            camera.lookAt(tank.position);

            renderer.render(scene, camera);//camera toevoegen
        }

        render();
    }

    
    init();
}


