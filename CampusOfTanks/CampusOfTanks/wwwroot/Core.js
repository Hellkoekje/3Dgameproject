window.onload = function ()
{
    var camera, scene, renderer;
    var cameraControls;

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

        var tank = new Tank();
        scene.add(tank);

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
    }

    init();
    render();
}
