registry = new Registry();

window.onload = function () {

    var camera, renderer;

    function init() {

        // Physics component.
        var physics = new Physics({
            solverIterations: 20,
            gravitationalPull: 9.81
        });

        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, 0.0, 0.3);
        physics.addPhysicsMaterial("slippery", physicsContactMaterial);

        registry.addComponent("physics", physics);

        //Input component
        var input = new Input();
        window.addEventListener('keydown', (e) => input.keyDownEvent(e));
        window.addEventListener('keyup', (e) => input.keyUpEvent(e));
        document.addEventListener('mousemove', (e) => input.mouseMoveEvent(e));

        registry.addComponent("input", input);

        //Camera component
        var gameCam = new Camera(1, 1500, 70, 150, -140);
        registry.addComponent("camera", gameCam);

        //Game window component
        var gameWindow = new GameWindow(window, document);
        window.addEventListener('resize', () => gameWindow.onWindowResize());

        registry.addComponent("window", gameWindow);

        gameCam.intializeCamera();

        //Scene component
        var scene = new GameScene(false);
        registry.addComponent("scene", scene);


        //muziek troep
        //var listener = new THREE.AudioListener();
        //camera.add(listener);

        //var sound = new THREE.Audio(listener);

        //var audioLoader = new THREE.AudioLoader();
        //audioLoader.load('/sounds/Iron.mp3', function (buffer) {
        //    sound.setBuffer(buffer);
        //    sound.setLoop(true);
        //    sound.play();
        //});

        //var guiControls = new function () {
        //    this.setVolume = 0.025;
        //};

        //var datGUI = new dat.GUI();
        //datGUI.add(guiControls, 'setVolume', 0, 1);


        //Slippery physics material.

        function render() {

            setTimeout(function () {
                requestAnimationFrame(render);
            }, 1000 / 30);

            input.update();
            physics.update();
            gameCam.update();

            //TODO: We probably want to manually update ALL entities.
            //tank.updateLabel();

            //sound.setVolume(guiControls.setVolume);
            var camera = gameCam.getCamera();
            gameWindow.update(scene.get(), camera);
        }

        render();
    }

    init();
};


