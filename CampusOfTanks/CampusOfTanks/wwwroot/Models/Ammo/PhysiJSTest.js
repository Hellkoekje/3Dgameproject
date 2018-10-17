class PhysiJSprojectile extends THREE.Group{
    constructor(firedFrom) {
        super();
        this.firedfrom = firedFrom;
        this.delay = 1000;
        this.alive = true;
        this.velocity = 0;
        this.init();
    }
    init() {
        var projectile = new Physijs.SphereMesh(
            new THREE.SphereGeometry(160,160,160),
            Physijs.createMaterial(
                new THREE.MeshPhongMaterial(
                    {  color: 0xbcc6cc, shininess: 100.0, emissive: 0x111111, specular: 0xbcc6cc }
                ),
                0.4,
                0.4,
                0.5));

        projectile.castShadow = true;
   
        projectile.setLinearVelocity(new THREE.Vector3(-Math.sin(this.firedfrom.rotation.y) * 10, 0, -Math.cos(this.firedfrom.rotation.y) * 10));
        this.velocity = projectile.linearVelocity;

    }

}