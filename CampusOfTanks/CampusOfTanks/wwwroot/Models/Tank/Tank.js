//class that represents a tank aka a player. This is the superclass for our different tanks.
class Tank extends GameObject {
    constructor(username, isLocal) {
        super();

        this.username = username;
        this.isLocal = isLocal;

        this.init();
        this.initInput();

        //invisible sphere which is always in front of the barrel of the tank, projectiles use this sphere's matrix to spawn in front of the barrel.
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 8, 8),
            new THREE.MeshBasicMaterial({ transparent: true })
        );

        this.add(this.sphere);
        this.sphere.visible = false;
        this.sphere.position.set(this.position.x, this.position.y + 12, this.position.z + 40);
        //amount of damage tank can take before getting rekt
        this.hitpoints = 100;

        this.speed = 50;
        this.turnSpeed = 1;
            
        //default ammo. 0 == appel, 1 == ei, 2 == bier
        this.ammoSelected = 2;
        this.ammoselect = "Bier";
        this.canShoot = true;

        //if false, remove from world
        this.alive = true;

        this.mass = 100;
        this.hitboxMaterial =  new CANNON.Material("tankhitbox");
        this.hitbox = new TankHitbox(this.mass, this.hitboxMaterial, this);
        this.position.y = -5;

        this.createLabel();
    }

    initInput() {
        var keys = {
            left: 65,
            forward: 87,
            right: 68,
            backwards: 83,
            space: 32,
            reload: 82
        };

        if (this.isLocal) {
            var input = registry.components.input;
            input.keyHeldAction(keys.forward, () => { this.move(1); });
            input.keyHeldAction(keys.backwards, () => { this.move(-1); });
            input.keyHeldAction(keys.right, () => { this.turn(-1); });
            input.keyHeldAction(keys.left, () => { this.turn(1); });
            input.keyPressAction(keys.space, () => { this.fire(); });
            input.keyPressAction(keys.reload, () => { this.cycleAmmo(); });

            this.registerUpdate(() => {
                this.lookAtMouse();
            });
        }
    }

    createLabel() {

        //hitpoints and name label
        this.canvas1 = document.createElement('canvas');
        this.context1 = this.canvas1.getContext('2d');
        this.context1.font = "Bold 40px Arial";
        this.context1.fillStyle = "rgba(255,0,0,0.95)";
        this.context1.fillText(this.username + " " + this.hitpoints, 0, 50);


        // canvas contents will be used for a texture
        this.labelTexture = new THREE.Texture(this.canvas1);
        this.labelTexture.needsUpdate = true;

        this.labelMaterial = new THREE.MeshBasicMaterial({ map: this.labelTexture, side: THREE.DoubleSide });
        this.labelMaterial.transparent = true;

        this.label = new THREE.Mesh(
            new THREE.PlaneGeometry(this.canvas1.width, this.canvas1.height),
            this.labelMaterial
        );
        this.label.scale.set(0.2, 0.2, 0.2);
        this.label.position.set(this.position.x, this.position.y + 20, this.position.z);
        this.add(this.label);
    }

    lookAtMouse() {
        var mouse = registry.components.input;
        var coords = mouse.mouseWorldPosition;
        this.lookAt(coords.x, coords.y, coords.z);
    }

    updateLabel() {
        this.context1.fillText(this.username + " " + this.hitpoints+"HP", 0, 50);

        // canvas contents will be used for a texture
        this.labelTexture = new THREE.Texture(this.canvas1);
        

        this.labelMaterial = new THREE.MeshBasicMaterial({ map: this.labelTexture, side: THREE.DoubleSide });
        this.labelMaterial.transparent = true;

        this.label.material = this.labelMaterial;

    }

    init() {

        var selfRef = this;
        //var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
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

        //camera.lookAt(this);
        this.castShadow = true;
    }
    //should be called when 'R' is pressed.
    cycleAmmo() {
        if (this.ammoSelected < 2) {
            this.updateLabel();
            this.ammoSelected++;
        }
        else {
            this.updateLabel();
            this.ammoSelected = 0;
        }

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
                    this.ammoselect = "Appel";
                 
                    break;
                case 1:
                    projectile = new Ei(this);
                    this.ammoselect = "Ei";
                   

                    break;
                case 2:
                    projectile = new Bier(this);
                    this.ammoselect = "Bier";
                  

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

    move(dir) {
        this.translateZ(dir * this.speed * this.deltaTime);
    }

    turn(dir) {
        this.rotateY(dir * this.turnSpeed * this.deltaTime);
    }
}
