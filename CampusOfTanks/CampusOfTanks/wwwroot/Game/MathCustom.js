class MathCustom {
    lerp1d(ax, bx, t)
    {
        return (1 - t) * ax + t * bx;
    }

    lerp2d(ax, ay, bx, by, t) {
        return new THREE.Vector2(
            this.lerp1d(ax, bx),
            this.lerp1d(ay, by)
        );
    }

    lerp3d(ax, ay, bx, by, t) {
        return new THREE.Vector3(
            this.lerp1d(ax, bx),
            this.lerp1d(ay, by),
            this.lerp1d(az, bz),
        );
    }
}