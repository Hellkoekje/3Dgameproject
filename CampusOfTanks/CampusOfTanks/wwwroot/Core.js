
﻿

window.onload = function () {

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
    var tank = new Tank(), enemytank = new Tank();


    function init() {
        //Cannon init
        world = new CANNON.World();
        world.broadphase = new CANNON.NaiveBroadphase();
        world.gravity.set(0, -9.82, 0);
        world.solver.iterations = 20;
        //THREE inits
        
        scene = new THREE.Scene();

        //camera

        camera = new THREE.PerspectiveCamera(70, window.innerwidth / window.innerheight, 1, 1500);
        cameraControls = new THREE.OrbitControls(camera, renderer);

        camera.rotation.x = 90 * Math.PI / 180;
        cameraControls.update();
        var controls = new THREE.ObjectControls(camera, window.domElement, tank);
        controls.setDistance(8, 200); // set min - max distance for zoom
        controls.setZoomSpeed(1); // set zoom speed
        //verlichting
        //hemilight + derictional light voor een realistische belichting
                
        var hemiLight = new THREE.HemisphereLight(0x7F7F7F, 0xFFFFFF, 0.8);

        hemiLight.position.set(0, 80, 0);
        scene.add(hemiLight);

        var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
        scene.add(hemiLightHelper);

       var dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
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
        //VISUAL meshes of bullets(apple,egg models.)
        scene.bulletMeshes = [];
        //actual collidable physics objects (spheres) placed inside of visual mesh.
        scene.bulletBodies = [];
        scene.tankMeshes = [];
        scene.tankHitboxes = [];
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

        plane.castShadow = false;
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

        scene.add(tank);
        //enemy tank for hitbox tests
        scene.add(enemytank);
        enemytank.position.x = 0;
        enemytank.position.z = -100;

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


        net = new Network();
        net.connect(window.location.hostname, window.location.port);



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

            
        }

        function setTankDirection() {
            //direction changed.
            //var delta_x = TankDirection;

            //var new_dx = camera.position.x + delta_x;
            tank.rotation.y = TankDirection;
            //camera.lookAt(tank.position);

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
            /*   //Copy coordinates from tank MESH to tank HITBOX, so the cannon.js body follows the mesh instead of the other way around.
               for (var i = 0; i < scene.tankMeshes.length; i++) {
                   scene.tankHitboxes[i].position.copy(scene.tankMeshes[i].position);
                   scene.tankHitboxes[i].quaternion.copy(scene.tankMeshes[i].quaternion);
               }*/


        }
        function render() {        
            updatePhysics();
            UpdateTank();
            requestAnimationFrame(render);
            console.log();
            cameraControls.update();
            renderer.render(scene,camera);//camera toevoegen
        }


        function waitForNetReady(callback, count) {
            // A five second timeout
            if (count > 50) {
                console.log("[NETWORK] Cannot establish network connection! :(");
            }

            if (!net.isAvailable()) {
                setTimeout(function () {
                    count++;
                    waitForNetReady(callback, count);
                }, 100);
            }
            else {
                setTimeout(function () {
                    callback();
                }, 1000);
            }
        }

        

        waitForNetReady(function () {
            var entity = new NetworkEntity(net, true, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
            render();
        });

    }
    init();
}