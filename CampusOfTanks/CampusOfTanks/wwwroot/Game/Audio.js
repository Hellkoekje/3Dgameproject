class Audio {

    constructor(masterVolume) {
        this.masterVolume = 0;
        this.sounds = [];

        var gameCam = registry.components.camera;
        this.sound = new THREE.Audio(gameCam.cameraListener);

        this.audioLoader = new THREE.AudioLoader();
        this.audioLoader.load('/sounds/Iron.mp3', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setLoop(true);
            this.sound.play();
        });

        this.sounds.push(this.sound);
        this.setVolume(masterVolume);
    }

    setVolume(vol) {
        this.masterVolume = vol;

        for (var i = 0; i < this.sounds.length; i++) {
            this.sounds[i].setVolume(this.masterVolume);
        }
    }
}