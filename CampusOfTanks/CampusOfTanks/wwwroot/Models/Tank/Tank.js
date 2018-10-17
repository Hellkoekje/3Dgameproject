///<reference path="~/wwwroot/Core.js"/>
//class that represents a tank aka a player.
class Tank extends THREE.Group {
    constructor() {
        super();

        this.init();
        //invisible sphere which is always in front of the barrel of the tank, projectiles use this sphere's matrix to spawn in front of the barrel.
        //super kut code maar wist niet hoe dit anders moest :/
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 8, 8),
            new THREE.MeshBasicMaterial({ transparent: true})
        );
        this.add(this.sphere);
        this.sphere.visible = false;
        this.sphere.position.set(
            this.position.x , this.position.y, this.position.z - 35
        );
    
        //default ammo
        this.ammoSelected = 0;
//ammo types user can cycle through
        this.ammoTypes = ["appel", "ei", "monster"];
        this.position.y = 3;
        this.canShoot = true;
    }

    //load 3d model
    init() {
        var selfRef = this;
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
                object.scale.set(40, 40, 40);
                object.rotation.y = Math.PI / 2;
                group.add(object);
                group.castShadow = true;

                selfRef.add(group);
            });
        });
    }
    //should be called when 'R' is pressed.
    cycleAmmo() {
        if (this.ammoSelected < 2) this.ammoSelected++;
        else this.ammoSelected = 0;


    }

    fire() {
        if (this.canShoot) {
            var selfref = this;
            var projectile;

            //check the selected ammo, and fire it!
            switch (this.ammoSelected) {
            case 0:
                projectile = new Appel(this);
                this.parent.bullets.push(projectile);
                break;
            case 1:
                    projectile = new Ei(this);
                this.parent.bullets.push(projectile);
                break;
            case 2:
                projectile = new PhysiJSprojectile(this);
                break;


            }
            //put the projectile  at the tip of the barrel
            projectile.applyMatrix(this.sphere.matrixWorld);

            //delay next shot
            this.canShoot = false;
            //add fired projectile to bullet array.
           
            
            //remove projectile from scene after 10s
            setTimeout(function() {
                    projectile.alive = false;
                    selfref.parent.remove(projectile);
                    selfref.remove(projectile);
                },
                10000);

            //delay next shot by the shootingdelay of the chosen ammo.

            setTimeout(function() {
                selfref.canShoot = true;
            },projectile.delay);
            this.parent.add(projectile);
        }
    }
}
