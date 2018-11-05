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
        document.addEventListener('mousewheel', (e) => input.mouseWheelEvent(e, 0));
        document.addEventListener('wheel', (e) => input.mouseWheelEvent(e, 1));


        registry.addComponent("input", input);

        //Camera component
        var gameCam = new Camera(1, 2500, 70, 0, 240, -100);
        registry.addComponent("camera", gameCam);

        //Game window component
        var gameWindow = new GameWindow(window, document);
        window.addEventListener('resize', () => gameWindow.onWindowResize());

        registry.addComponent("window", gameWindow);

        //Intialize camera after the window is created.
        gameCam.intializeCamera();

        //Game object collection component.
        var gameObjectCollection = new GameObjectCollection();
        registry.addComponent("gameobjects", gameObjectCollection);

        //Scene component
        var scene = new GameScene(false);
        registry.addComponent("scene", scene);

        //Audio component
        var audio = new Audio(0.001);
        registry.addComponent("audio", audio);

        //GUI component.
        var gui = new Gui();
        registry.addComponent("gui", gui);

        document.getElementById("AMMO").style.bottom = "100px";
        document.getElementById("AMMO").style.position = "absolute";
        
        var clock = new THREE.Clock(true);

        function render() {
            var delta = clock.getDelta();

            input.update();
            physics.update();

            gameObjectCollection.update(delta);
            gameCam.update();
            
            gameWindow.update(scene.getScene(), gameCam.getCamera());
            requestAnimationFrame(render);
        }

        render();
    }

    init();
};


