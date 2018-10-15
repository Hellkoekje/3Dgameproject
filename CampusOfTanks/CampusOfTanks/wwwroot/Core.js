

window.onload = function ()
{
    var camera, scene, renderer;
    var cameraControls;

 


    function init() 
    {

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
        cameraControls = new THREE.OrbitControls(camera);
        camera.position.z = -4;
        camera.position.y = -20;
        camera.position.x = -4;
        camera.rotation.x = 90 * Math.PI / 180;
        cameraControls.update();
        //scene = new THREE.Scene(); <- Replaced by a PhysiJS scene
        scene = new Physijs.Scene();
        scene.setGravity(0, -10, 0); // Gravity for our scene.
        scene.bullets = [];
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);

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
        var tank = new Tank();
        tank.position.x = 0;
        
        tank.position.z = 0;
        scene.add(tank);

     /*   //ammo tests

         //ei
        var ei = new Ei(tank);
        scene.add(ei);
         //appel
        var appel = new Appel(tank);
        scene.add(appel);
         //monster
        var monster = new MonsterEnergy(tank);
        monster.position.x = 0;
        monster.position.y = 0;
        monster.position.z = 0;
        scene.add(monster);
    */
        
        document.addEventListener("keydown", function (event) {
            var keycode = event.which;
            if (keycode == 32) { //spacebar, knalluh
                tank.fire();
                
            }
            if (keycode == 82) { // R, switch ammo
                tank.cycleAmmo();
            }


        }, false);
        
        function onWindowResize()
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    function render() {

        for (var index = 0; index < scene.bullets.length; index++) {
            if (scene.bullets[index] === undefined) continue;
            if (scene.bullets[index].alive === false) {
                scene.bullets.splice(index, 1);
                continue;
            }
            scene.bullets[index].position.add(scene.bullets[index].velocity);
            console.log("updating!");
        }



        requestAnimationFrame(render);
        cameraControls.update();
        renderer.render(scene, camera);

    }

    init();
    render();
}
