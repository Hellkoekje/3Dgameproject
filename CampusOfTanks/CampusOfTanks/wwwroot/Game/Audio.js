class Audio {

    constructor(masterVolume) {
        this.masterVolume = 0.2;

        var gameCam = registry.components.camera;
        this.sound = new THREE.Audio(gameCam.cameraListener);

        this.audioLoader = new THREE.AudioLoader();
        audioLoader.load('/sounds/Iron.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.play();

        });
    }

}