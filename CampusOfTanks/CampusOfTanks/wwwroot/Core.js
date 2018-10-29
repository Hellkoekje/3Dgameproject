﻿

window.onload = function () {

    var camera, scene, renderer, world, sphere, spherebody;
    var net;

    var cameraControls;
    var TankDirection = 270 * Math.PI / 180;
    var angularSpeed = 0.5;
    var TankSpeed = 0.075;
    var TankIsRotatingLeft = 0;
    var TankIsRotatingRight = 0;
    var TankIsMovingForward = 0;
    var TankIsMovingBackwards = 0;
    var TankBackwardsSpeed = TankSpeed * 0.4;

    var tank = new Tank(), enemytank = new Tank();


    function init() {
        //Cannon init
        world = new CANNON.World();
        world.broadphase = new CANNON.NaiveBroadphase();
        world.gravity.set(0, -9.82, 0);
        world.solver.iterations = 20;
        //THREE inits
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
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
        scene = new THREE.Scene();

        //VISUAL meshes of bullets(apple,egg models.)
        scene.bulletMeshes = [];
        //actual collidable physics objects (spheres) placed inside of visual mesh.
        scene.bulletBodies = [];
        scene.cannonWorld = world;
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

        plane.reveiveShadow = true;
        plane.position.x = 0;
        plane.position.y = -5;
        plane.position.z = 0;
        plane.rotation.x = -(Math.PI / 2);
        plane.rotation.y = 0;
        plane.rotation.z = 0;
        scene.add(plane);

        /* //Collision testing walls.
 
         //arr of meshes our ammo can collide with
         var collidableMeshList = [];
 
         //walls that our ammo is going to collide with
         var wallGeometry = new THREE.CubeGeometry(100, 100, 20, 1, 1, 1);
         var wallMaterial = new THREE.MeshBasicMaterial({ color: 0x8888ff });
         var wireMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
 
         var wallShape = new CANNON.Plane(100,100,20);
         var wallBody = new CANNON.Body({ mass: 0, material: physicsMaterial });
         var wall2Body = new CANNON.Body({ mass: 0, material: physicsMaterial });
         wallBody.addShape(wallShape);
         wall2Body.addShape(wallShape);
       //  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
         
 
         var wall = new THREE.Mesh(wallGeometry, wallMaterial);
         wall.position.set(100, 50, -100);
         scene.add(wall);
         collidableMeshList.push(wall);
        
 
         var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
         wall2.position.set(-150, 50, 0);
         wall2.rotation.y = 3.14159 / 2;
         scene.add(wall2);
         collidableMeshList.push(wall2);
 
         wallBody.position.copy(wall.position);
         wall2Body.position.copy(wall2.position);
         wallBody.quaternion.copy(wall.quaternion);
         wall2Body.quaternion.copy(wall2.quaternion);
         world.addBody(wallBody);
         world.addBody(wall2Body);*/


        //Skybox
        scene.add(
            new THREE.Mesh(new THREE.SphereGeometry(750, 12, 12),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("Textures/skybox.jpg"),
                    side: THREE.DoubleSide
                }))
        );

        var ambientlight = new THREE.AmbientLight(0xFFFFFF);
        ambientlight.intensity = 1;
        scene.add(ambientlight);


        tank.position.x = 0;
        tank.position.y = -5;
        //  tank.rotation.z = 90 * Math.PI / 180;
        tank.rotation.y = 270 * Math.PI / 180;
        scene.add(tank);

        //enemy tank for hitbox tests
        enemytank.position.x = 0;
        enemytank.position.z = -100;
        // enemytank.rotation.z = 90 * Math.PI / 180;
        //enemytank.rotation.y = 180 * Math.PI / 180;
        scene.add(enemytank);


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

        var mass = 20, radius = 1.3;
        var sphereShape = new CANNON.Sphere(radius);
        spherebody = new CANNON.Body({ mass: mass, material: physicsMaterial });
        spherebody.addShape(sphereShape);
        spherebody.position.set(20, 100, 0);
        //   spherebody.linearDamping = 0.9;
        world.addBody(spherebody);
        // Create a plane
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ mass: 0, material: physicsMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        groundBody.position.set(0, -5, 0);
        world.addBody(groundBody);

        var spheregeo = new THREE.SphereGeometry(radius, 16, 16);
        var spheremat = new THREE.MeshBasicMaterial({ color: 0xfffffff });
        sphere = new THREE.Mesh(spheregeo, spheremat);
        scene.add(sphere);


        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }


    function moveForward(speed) {

        var delta_z = -speed * Math.cos(TankDirection);
        var delta_x = -speed * Math.sin(TankDirection);

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
        //direction changed.
        //var delta_x = TankDirection;

        //var new_dx = camera.position.x + delta_x;
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
        //key_down();

    }

    var a = false;

    function key_down(event) {
        keys = { LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83, SPACE: 32, RELOAD: 82 };

        switch (event.keyCode) {
            case keys.UP:

                TankIsMovingBackwards = 1;
                break;

            case keys.BOTTOM:
                TankIsMovingForward = 1;
                
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
        sphere.position.copy(spherebody.position);
        sphere.quaternion.copy(spherebody.quaternion);
        for (var i = 0; i < scene.bulletMeshes.length; i++) {
            if (scene.bulletMeshes[i].alive) {
                scene.bulletMeshes[i].position.copy(scene.bulletBodies[i].position);
                scene.bulletMeshes[i].quaternion.copy(scene.bulletBodies[i].quaternion);
            } else {
                scene.bulletMeshes.splice(i, 1);
                scene.bulletBodies.splice(i, 1);
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


    // net = new Network();
    //  net.connect(window.location.hostname, window.location.port);
    init();
    render();
}
