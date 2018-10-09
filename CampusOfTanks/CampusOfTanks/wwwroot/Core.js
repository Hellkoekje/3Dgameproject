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

        var geometry = new THREE.PlaneGeometry(100, 100, 100);
        var material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Textures/Ground.jpg"), side: THREE.DoubleSide });
        var plane = new THREE.Mesh(geometry, material);
        plane.reveiveShadow = true;
        plane.rotation.x = material.PI / 2.0;
        plane.position.x = 50;
        plane.position.y = 50;
        scene.add(plane);

        var ambientlight = new THREE.AmbientLight(0xFFFFFF);
        ambientlight.intensity = 1;
        scene.add(ambientlight);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
    init();
    animate();
}
