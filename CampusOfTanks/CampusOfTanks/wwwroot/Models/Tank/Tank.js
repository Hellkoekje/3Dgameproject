///<reference path="~/wwwroot/Core.js"/>
//class that represents a tank aka a player.
class Tank extends THREE.Group {
    constructor() {
        super();

        this.init();
//default ammo
        this.ammoSelected = 0;
//ammo types user can cycle through
        this.ammoTypes = ["appel", "ei", "monster"];
        this.position.y = 3;
        
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
        if (this.ammoSelected < 1) this.ammoSelected++;
        else this.ammoSelected = 0;


    }

    fire() {
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
                projectile = new MonsterEnergy(this);
                break;

                
            
        
        }
        this.parent.bullets.push(projectile);
        projectile.position.set(this.position.x + 4, this.position.y, this.position.z - 35);
        projectile.velocity = new THREE.Vector3(-Math.sin(selfref.rotation.y),0,-Math.cos(selfref.rotation.y));
        setTimeout(function() {
                projectile.alive = false;
                selfref.parent.remove(projectile);
        }, 10000);
        this.parent.add(projectile);
    }
    
}
