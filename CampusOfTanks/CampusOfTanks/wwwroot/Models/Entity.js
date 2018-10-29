class Entity extends THREE.Object3D
{
    constructor(isReplicated)
    {
        super();

        this.isReplicated = isReplicated;
    }

    setPosition(x, y, z)
    {
        if (!this.isReplicated)
        {
            this.position.set(x, y, z);
        }
    }

    setScale(x, y, z)
    {
        if (!this.isReplicated)
        {
            this.scale.set(x, y, z);
        }
    }
}