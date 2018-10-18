

window.onload = function ()
{

    var camera, scene, renderer, world, sphere, spherebody;
    var net;

    var cameraControls;
    var TankDirection = 0;
    var angularSpeed = 0.1;
    var TankSpeed = 0.075;
    var TankDirection = 0;
    var TankIsRotatingLeft = 0;
    var TankIsRotatingRight = 0;
    var TankIsMovingForward = 0;
    var TankIsMovingBackwards = 0;
    var TankBackwardsSpeed = TankSpeed * 0.4;
    var tank = new Tank();
    tank.name = 'tanky';

 


    function init() 
    {
        //Cannon init
        world = new CANNON.World();
        world.broadphase = new CANNON.NaiveBroadphase();
        world.gravity.set(0, -9.82, 0);
        world.solver.iterations = 20;
        //THREE inits
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
        cameraControls = new THREE.OrbitControls(camera);
        camera.rotation.x = 90 * Math.PI / 180;
        camera.position.z = 50;
        camera.position.y = 0;
        camera.position.x = 50;
        camera.lookAt(tank.position);
        cameraControls.update();
      //  var controls = new THREE.ObjectControls(camera, window.domElement, tank);
        //controls.setDistance(8, 200); // set min - max distance for zoom
      //  controls.setZoomSpeed(1); // set zoom speed
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
        var texture = new THREE.TextureLoader().load("Textures/Ground.jpg", function (texture) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(10, 10);
        });

        var material = new THREE.MeshPhongMaterial({ map: texture});
        var plane = new THREE.Mesh(geometry, material);

        plane.reveiveShadow = true;
        plane.position.x = 0;
        plane.position.y = -5;
        plane.position.z = 0;
        plane.rotation.x = -(Math.PI / 2);
        plane.rotation.y = 0;
        plane.rotation.z = 0;
        scene.add(plane);

        //Collision testing walls.

        //arr of meshes our ammo can collide with
        var collidableMeshList = [];

        //walls that our ammo is going to collide with
        var wallGeometry = new THREE.CubeGeometry(100, 100, 20, 1, 1, 1);
        var wallMaterial = new THREE.MeshBasicMaterial({ color: 0x8888ff });
        var wireMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });

        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(100, 50, -100);
        scene.add(wall);
        collidableMeshList.push(wall);
        var wall = new THREE.Mesh(wallGeometry, wireMaterial);
        wall.position.set(100, 50, -100);
        scene.add(wall);

        var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
        wall2.position.set(-150, 50, 0);
        wall2.rotation.y = 3.14159 / 2;
        scene.add(wall2);
        collidableMeshList.push(wall2);
        var wall2 = new THREE.Mesh(wallGeometry, wireMaterial);
        wall2.position.set(-150, 50, 0);
        wall2.rotation.y = 3.14159 / 2;
        scene.add(wall2);
        

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

        // Tank object
        tank.position.x = 0;
        tank.position.z = 0;
        scene.add(tank);
        
       
/* cannonjs test
 */
        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3  // restitution
        );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        var mass = 20, radius = 1.3;
       var sphereShape = new CANNON.Sphere(radius);
        spherebody = new CANNON.Body({ mass: mass, material: physicsMaterial });
        spherebody.addShape(sphereShape);
        spherebody.position.set(20,100,0);
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



        

        function onWindowResize()
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }


    

    function moveForward(speed)
    {
        var delta_x = speed * Math.cos(TankDirection);
        var delta_z = speed * Math.sin(TankDirection);
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

    var a = false;
    function key_down(event) {
        keys = { LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83, SPACE: 32, RELOAD:82};

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

    function setTankDirection() {
        //direction changed.
        var delta_x = TankSpeed * Math.cos(TankDirection);
        var delta_z = TankSpeed * Math.sin(TankDirection);
        tank.rotateY(delta_x);

        var new_dx = camera.position.x + delta_x;
        var new_dz = camera.position.z + delta_z;
        tank.position.x = delta_x;
        tank.position.z = delta_z;
        camera.lookAt(tank.position);

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


    function updatePhysics() {
        // Step the physics world
        world.step(1/60);
        // Copy coordinates from Cannon.js to Three.js
        sphere.position.copy(spherebody.position);
        sphere.quaternion.copy(spherebody.quaternion);
        for (var i = 0; i < scene.bulletMeshes.length; i++) {
            if (scene.bulletMeshes[i].alive) {
                scene.bulletMeshes[i].position.copy(scene.bulletBodies[i].position);
                scene.bulletMeshes[i].quaternion.copy(scene.bulletBodies[i].quaternion);
                //console.log(scene.bulletBodies[i].position);
                // console.log(scene.bulletMeshes[i].position);
            } else {
                scene.bulletMeshes.splice(i, 1);
                scene.bulletBodies.splice(i, 1);
            }

        }
        
    }

    function render()
    {
        //iterate over active projectiles, removing them when needed and updating them if not.
      /*  for (var index = 0; index < scene.bullets.length; index++) {
            if (scene.bullets[index] === undefined) continue;
            if (scene.bullets[index].alive === false) {
                scene.bullets.splice(index, 1);
                continue;
            }
            scene.bullets[index].position.add(scene.bullets[index].velocity);
          
            //  console.log("updating!");*/
        //}

        updatePhysics();
        UpdateTank();
        requestAnimationFrame(render);
        camera.lookAt(tank.position);
<<<<<<< HEAD
=======
        cameraControls.update();
        
>>>>>>> 4ab851a062b931a83f85003edf2f30d8445587ea
        renderer.render(scene, camera);

    }
    
    init();

    net = new Network();
    net.connect(window.location.hostname, window.location.port);

    render();
}
