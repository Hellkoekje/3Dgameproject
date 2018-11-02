class MathCustom {
    lerp1d(a, b, t)
    {
        return a * (1 - t) + b * t;
    }

    lerp2d(v0, v1, t) {
        return new THREE.Vector2(
            this.lerp1d(v0.x, v1.x, t),
            this.lerp1d(v0.y, v1.x, t)
        );
    }

    lerp3d(v0, v1, t) {
        return new THREE.Vector3(
            this.lerp1d(v0.x, v1.x, t),
            this.lerp1d(v0.y, v1.y, t),
            this.lerp1d(v0.z, v1.z, t),
        );
    }
}