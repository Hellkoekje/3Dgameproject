class Tank extends THREE.Group {
    constructor() {
        super();

        this.init();
    }
    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('Models/Tank/');
        var url = "Tiger_I.mtl";
        mtlLoader.load(url, function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('Models/Tank/');
            objLoader.load('Tiger_I.obj', function (object) {
                var group = new THREE.Group();
                object.scale.set(0.75, 0.75, 0.75);
                object.rotation.y = Math.PI / 2;
                group.add(object);
                group.castShadow = true;

                selfRef.add(group);
            });
        });
    }


    fire(ammo) {
        switch (ammo.type) {
            case Appel:
                break;
            case Ei:
                break;
            case MonsterEnergy:
                break;

            
        
        }
    }
}