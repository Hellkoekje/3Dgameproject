//Class for custom math.
class MathCustom {

    //Linear inerpolate over 1 axis.
    lerp1d(a, b, t) {
        return a * (1 - t) + b * t;
    }

    //Linear inerpolate over 2 axii.
    lerp2d(v0, v1, t) {
        return new THREE.Vector2(
            this.lerp1d(v0.x, v1.x, t),
            this.lerp1d(v0.y, v1.x, t)
        );
    }

    //Linear inerpolate over 3 axii.
    lerp3d(v0, v1, t) {
        return new THREE.Vector3(
            this.lerp1d(v0.x, v1.x, t),
            this.lerp1d(v0.y, v1.y, t),
            this.lerp1d(v0.z, v1.z, t),
        );
    }

    //Clamp a value between 0.0 and 1.0
    clamp01(v) {
        if (v > 1.0) return 1.0;
        if (v < 0.0) return 0.0;

        return v;
    }

    //Picks a random value between min and max.
    range(min, max) {
        return min + Math.round(Math.random() * max);
    }
}
