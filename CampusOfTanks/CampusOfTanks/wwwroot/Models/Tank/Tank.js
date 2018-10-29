///<reference path="~/wwwroot/Core.js"/>
//class that represents a tank aka a player. This is the superclass for our different tanks.
//TODO make subclasses that represent other types of tanks, one of which should move faster, one of which should shoot faster, and one of which should have higher hitpoints.
//TODO and should have different models 

class Tank extends THREE.Group {
    constructor() {
        super();

        this.init();
        //invisible sphere which is always in front of the barrel of the tank, projectiles use this sphere's matrix to spawn in front of the barrel.
        //super kut code maar wist niet hoe dit anders moest :/
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 8, 8),
            new THREE.MeshBasicMaterial({ transparent: true })
        );
        this.add(this.sphere);
        this.sphere.visible = false;
        this.sphere.position.set(
            this.position.x, this.position.y+30, this.position.z);

        //default ammo. 0 == appel, 1 == ei, 2 == bier
        this.ammoSelected = 2;
        this.rotation.z = 90 * Math.PI / 180;

        
        this.canShoot = true;

    }

    //load 3d model
    init() {
        var selfRef = this;
        var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('Models/Tank/');
        var url = "materials.mtl";
        mtlLoader.load(url, function (materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('Models/Tank/');
            objLoader.load('model.obj', function (object) {
                var group = new THREE.Group();
               // object.scale.set(10,10,10);
             //   object.rotation.z = 90 * Math.PI / 180;
                object.rotation.y = Math.PI / 2;
                group.add(object);
                group.castShadow = true;

                selfRef.add(group);
            });
        });
        camera.lookAt(selfRef);
        self.castShadow = true;


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
