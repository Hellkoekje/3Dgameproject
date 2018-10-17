



class Appel extends Projectile {
    constructor(firedFrom) {
        super(firedFrom);
        
        this.init();
        //firedFrom.localToWorld(firedFrom.barrelPoint);
        //this.position.set(firedFrom.barrelPoint.x,firedFrom.barrelPoint.y,firedFrom.barrelPoint.z);
     
        this.delay = 5000;
        this.velocity = new THREE.Vector3(-Math.sin(firedFrom.rotation.y) * 10, 0, -Math.cos(firedFrom.rotation.y) * 10);
    }
    
    init() {
        var selfRef = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("Models/Ammo/Appel/");
       
        mtlLoader.load("Apple.mtl", function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("Models/Ammo/Appel/");
            objLoader.load("Apple.obj", function (object) {
                
                object.scale.set(0.04, 0.04, 0.04);
                object.rotation.y = Math.PI / 2;
               
                selfRef.castShadow = true;

                selfRef.add(object);
            });
        });

    }

}