class BoxEntity extends Entity
{
    constructor(isReplicated) {
        super(isReplicated);
    }

    get()
    {
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        return cube;
    }
}