registry = new Registry();

window.onload = function () {

    var camera, renderer;

    function init() {

        var physics = new Physics({
            solverIterations: 20,
            gravitationalPull: 9.81
        });

        registry.addComponent("physics", physics);

        var input = new Input();
        window.addEventListener('keydown', (e) => input.keyDownEvent(e));
        window.addEventListener('keyup', (e) => input.keyUpEvent(e));
        document.addEventListener('mousemove', (e) => input.mouseMoveEvent(e));

        registry.addComponent("input", input);

        var scene = new GameScene(false);

        registry.addComponent("scene", scene);

        //Setup camera and controls.
        var aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(70, aspect, 1, 1500);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Events 
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);

        //muziek troep
        var listener = new THREE.AudioListener();
        camera.add(listener);

        var sound = new THREE.Audio(listener);

        var audioLoader = new THREE.AudioLoader();
        audioLoader.load('/sounds/Iron.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.play();
        });

        var guiControls = new function () {
            this.setVolume = 0.025;
        };

        var datGUI = new dat.GUI();
        datGUI.add(guiControls, 'setVolume', 0, 1);


        //Slippery physics material.
        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, 0.0, 0.3);
        physics.addPhysicsMaterial("slippery", physicsContactMaterial);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function render() {

            setTimeout(function () {
                requestAnimationFrame(render);
            }, 1000 / 30);

            input.update();

            //TODO: We probably want to manually update ALL entities.
            //tank.updateLabel();

            physics.update();

            //camera.position.x = tank.position.x;
            //camera.position.y = tank.position.y + 150;
            //camera.position.z = tank.position.z - 140;
            //camera.lookAt(tank.position);

            sound.setVolume(guiControls.setVolume);
            renderer.render(scene.get(), camera);
        }

        render();
    }

    init();
};


