
//class that represents a tank aka a player. This is the superclass for our different tanks.


class Tank extends THREE.Group {
    constructor(username) {
        super();

        this.init();
        //invisible sphere which is always in front of the barrel of the tank, projectiles use this sphere's matrix to spawn in front of the barrel.
        this.username = username;
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 8, 8),
            new THREE.MeshBasicMaterial({ transparent: true })
        );
        this.add(this.sphere);
        this.sphere.visible = false;
        this.sphere.position.set(this.position.x, this.position.y + 12, this.position.z + 40);
        this.hitpoints = 100;
            
        //default ammo. 0 == appel, 1 == ei, 2 == bier
        this.ammoSelected = 2;


        
        this.canShoot = true;

    
        //if false, remove from world
        this.alive = true;
        this.mass = 100;
        this.hitboxMaterial =  new CANNON.Material("tankhitbox");
        this.hitbox = new TankHitbox(this.mass, this.hitboxMaterial, this);
        this.position.y = -5;

        //cube test

         this.cubegeo = new THREE.BoxGeometry(20, 10, 30);
         this.cubemat = new THREE.MeshBasicMaterial();
        this.cubemesh = new THREE.Mesh(this.cubegeo, this.cubemat);
        

    }

    //load 3d model
    init() {

        var selfRef = this;
        var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
        var mtlLoader = new THREE.MTLLoader();

        mtlLoader.setPath('Models/Tank/');
        var url = "shadowsword.mtl";

        mtlLoader.load(url, function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.setPath('Models/Tank/');
            objLoader.load('shadowsword.obj', function (object) {

                var group = new THREE.Group();
              // object.scale.set(20,20,20);
             //   object.rotation.z = 90 * Math.PI / 180;
                //object.rotation.y = Math.PI / 2;
                group.add(object);
                group.castShadow = true;

                selfRef.add(group);
            });
        });
        camera.lookAt(selfRef);
        selfRef.castShadow = true;


    }
    //should be called when 'R' is pressed.
    cycleAmmo() {
        if (this.ammoSelected < 2) this.ammoSelected++;
        else this.ammoSelected = 0;


    }
    //called when spacebar is pressed.
    fire() {
        if (this.canShoot) {
            var selfref = this;
            var projectile;

            //check the selected ammo, and fire it!
            switch (this.ammoSelected) {
                case 0:
                    projectile = new Appel(this);
                    break;
                case 1:
                    projectile = new Ei(this);
                    break;
                case 2:
                    projectile = new Bier(this);
                    break;


            }
            //fire the projectile!
            projectile.biem();

            //delay next shot by the shootingdelay of the chosen ammo.
            this.canShoot = false;
            setTimeout(function () {
                selfref.canShoot = true;
            }, projectile.delay);

        }
    }

}
