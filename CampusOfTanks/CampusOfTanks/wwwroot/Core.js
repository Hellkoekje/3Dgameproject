window.onload = function ()
{
    var camera, scene, renderer;
    var network;
    var cameraControls;
    var TankDirection = 0;
    var angularspeed = 0.01;
    var TankSpeed = 0.075;
    var TankIsRotatingLeft = 0;
    var TankIsRotatingRight = 0;
    var TankIsMovingForward = 0;
    var TankIsMovingBackwards = 0;
    var angularSpeed;
    var tank;

    function init() 
    {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
        cameraControls = new THREE.OrbitControls(camera);
        camera.position.z = -4;
        camera.position.y = 3;
        camera.position.x = -4;
        camera.rotation.x = 90 * Math.PI / 180;
        cameraControls.update();

        scene = new THREE.Scene();

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
        var texture = new THREE.TextureLoader().load("Textures/Ground.jpg", function (texture) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(10, 10);
        });

        var material = new THREE.MeshPhongMaterial({ map: texture});
        var plane = new THREE.Mesh(geometry, material);

        plane.reveiveShadow = true;
        plane.position.x = 0;
        plane.position.y = -20;
        plane.position.z = 0;
        plane.rotation.x = -(Math.PI / 2);
        plane.rotation.y = 0;
        plane.rotation.z = 0;
        scene.add(plane);

        //Skybox
        scene.add(
            new THREE.Mesh(new THREE.SphereGeometry(750, 12, 12),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("Textures/skybox.jpg"), side: THREE.DoubleSide
                }))
        );

        var ambientlight = new THREE.AmbientLight(0xFFFFFF);

        ambientlight.intensity = 1;
        scene.add(ambientlight);

        tank = new Tank();
        scene.add(tank);

        function onWindowResize()
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    function key_up(event) {
        TankIsMovingForward = 0;
        TankIsMovingBackwards = 0;
        TankIsRotatingLeft = 0;
        TankIsRotatingRight = 0;
        TankGoesUp = 0;
        TankGoesDown = 0;
    }

    function moveForward(speed)
    {
        var delta_x = speed * Math.cos(TankDirection);
        var delta_z = speed * Math.sin(TankDirection);
        var new_x = camera.position.x + delta_x;
        var new_z = camera.position.z + delta_z;

        camera.position.x = new_x;
        camera.position.z = new_z;

        var new_dx = tank.x + delta_x;
        var new_dz = tank.z + delta_z;
        tank.x = new_dx;
        tank.z = new_dz;
        camera.lookAt(tank);
    }
    function key_down(event) {
        var W = 87;
        var A = 83;
        var S = 65;
        var D = 68;
        var minus = 189;
        var plus = 187;

        var k = event.keyCode;
        if (k === A)
        {
            TankIsRotatingLeft = 1;
        }
        else if (k === D)
        {
            TankIsRotatingRight = 1;
        }
        else if(k === W)
        {
            TankIsMovingForward = 1;
        }
        else if (k === S)
        {
            TankIsMovingBackwards = 1;
        }
    }
    function setTankDirection()
    {
        //direction changed.
        var delta_x = TankSpeed * Math.cos(TankDirection);
        var delta_z = TankSpeed * Math.sin(TankDirection);

        var new_dx = camera.position.x + delta_x;
        var new_dz = camera.position.z + delta_z;
        tank.x = new_dx;
        tank.z = new_dz;

        camera.lookAt(tank);
    }

    function UpdateTank() {
        if (TankIsRotatingLeft) { // rotate left
            TankDirection -= angularSpeed;
        }
        if (TankIsRotatingRight) { // rotate right
            TankDirection += angularSpeed;
        }
        if (TankIsRotatingRight || TankIsRotatingLeft) {
            setTankDirection();
            return;
        }
        if (TankIsMovingForward)
        { // go forward
            moveForward(TankSpeed);
            return;
        }
        if (TankIsMovingBackwards) { // go backwards
            var speed = -(TankSpeed * 0.4);
            moveForward(speed);
            return;
        }

    }

    function render() {
        UpdateTank();

        requestAnimationFrame(render);
        cameraControls.update();
        renderer.render(scene, camera);
    }
    
    init();
    render();

    network = new Network();
    network.connect(window.location.hostname, window.location.port);

}
