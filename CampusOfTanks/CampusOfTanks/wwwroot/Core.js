math = new MathCustom();
registry = new Registry();

window.onload = function () {

    function init() {

        // Physics component.
        var physics = new Physics({
            solverIterations: 20,
            gravitationalPull: 9.81
        });

        //Physics; Slippery physics material.
        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, 0.0, 0.3);
        physics.addPhysicsMaterial("slippery", physicsContactMaterial);

        registry.addComponent("physics", physics);

        //Input component
        var input = new Input();
        window.addEventListener('keydown', (e) => { input.keyDownEvent(e); });
        window.addEventListener('keyup', (e) => input.keyUpEvent(e));
        document.addEventListener('mousemove', (e) => input.mouseMoveEvent(e));
        document.addEventListener('mousewheel', (e) => input.mouseWheelEvent(e));

        registry.addComponent("input", input);

        //Camera component
        var gameCam = new Camera(1, 2500, 70, 0, 150, -140);
        registry.addComponent("camera", gameCam);

        //Game window component
        var gameWindow = new GameWindow(window, document);
        window.addEventListener('resize', () => gameWindow.onWindowResize());

        registry.addComponent("window", gameWindow);

        gameCam.intializeCamera();

        var gameObjectCollection = new GameObjectCollection();
        registry.addComponent("gameobjects", gameObjectCollection);

        //Scene component
        var scene = new GameScene(false);
        registry.addComponent("scene", scene);

        //muziek troep
        var sound = new THREE.Audio(gameCam.cameraListener);

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

        var clock = new THREE.Clock(true);

        function render() {
            var delta = clock.getDelta();

            input.update();
            physics.update();

            //TODO: We probably want to manually update ALL entities.
            //tank.updateLabel();
            gameObjectCollection.update(delta);
            gameCam.update();
            
            sound.setVolume(guiControls.setVolume);
            gameWindow.update(scene.getScene(), gameCam.getCamera());
            requestAnimationFrame(render);
        }

        render();
    }

    init();
};


