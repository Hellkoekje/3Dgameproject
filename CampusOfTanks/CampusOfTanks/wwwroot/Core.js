window.onload = function () {
    var camera, scene, renderer;
    var cameraControls;

    function init() {
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

        //Plane stuff.
        var geometry = new THREE.PlaneGeometry(1000, 1000, 1000);

        //Repeat plane texture! :D
        var texture = new THREE.TextureLoader().load("Textures/Ground.jpg", function (texture) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(10, 10);
        });

        var material = new THREE.MeshPhongMaterial({ map: texture });
        var plane = new THREE.Mesh(geometry, material);

        plane.castShadow = false;
        plane.reveiveShadow = true;
        plane.position.x = 0;
        plane.position.y = -20;
        plane.position.z = 0;
        plane.rotation.x = -(Math.PI / 2);
        plane.rotation.y = 0;
        plane.rotation.z = 0;
        scene.add(plane);

        var grid = new THREE.GridHelper(950, 10);
        var color = new THREE.Color("rgb(255,0,0)");
        grid.setColors(color, 0xFFFFFF);

        scene.add(grid);

       

        //Skybox
        scene.add(
            new THREE.Mesh(new THREE.SphereGeometry(750, 12, 12),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("Textures/skybox.jpg"), side: THREE.DoubleSide
                }))
        );

        //verlichting
        //hemilight + derictional light voor een realistische belichting

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
        //dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 100, 0xFFFFFF);
        //scene.add(dirLightHeper);  

        //dit is de camera helper
        //var helper = new THREE.CameraHelper(dirLight.shadow.camera);
        //scene.add(helper);

        //gui scherm
        var guiControls = new function () {

            this.RotationX = 0.01;
            this.RotationZ = 0.01;
            this.RotationY = 0.01;
        }
        var datGUI = new dat.GUI();
        datGUI.add(guiControls, 'RotationX', 0, 1);
        datGUI.add(guiControls, 'RotationY', 0, 1);
        datGUI.add(guiControls, 'RotationZ', 0, 1);

        //shadow testing
        var geometry = new THREE.BoxBufferGeometry(3, 3, 3);
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(8, 3, 8);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
        var geometry = new THREE.BoxBufferGeometry(10, 0.15, 10);
        var material = new THREE.MeshPhongMaterial({
            color: 0xa0adaf,
            shininess: 150,
            specular: 0x111111
        });
    
        function onWindowResize()
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    

        function render() {
            requestAnimationFrame(render);
            cameraControls.update();
            renderer.render(scene, camera);

            var time = Date.now() * 0.00025;
            var d = 150;

            cube.position.x = Math.sin(time * 0.7) * d;
            cube.position.z = Math.cos(time * 0.3) * d;
            

        }

    init();
    render();
}
