class Audio {

    constructor(masterVolume) {
        this.masterVolume = 0;
        this.sounds = [];

        this.gameCam = registry.components.camera;
        this.sound = new THREE.Audio(this.gameCam.cameraListener);

        this.audioLoader = new THREE.AudioLoader();
        this.audioLoader.load('/sounds/seashanty.mp3', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setLoop(true);
            this.sound.play();
        });

        this.sounds.push(this.sound);
        this.setVolume(masterVolume);

        
        

    }

    shoot(projectile) {
        
        switch (projectile) {
            case "Ei":
                var sound1 = new THREE.PositionalAudio(this.gameCam.cameraListener);
                this.audioLoader.load('sounds/ei.wav', function (buffer) {
                    sound1.setBuffer(buffer);
                    sound1.setRefDistance(20);
                    sound1.play();
                });
                break;
            case "Appel":
                var sound1 = new THREE.PositionalAudio(this.gameCam.cameraListener);
                this.audioLoader.load('sounds/appel.wav', function (buffer) {
                    sound1.setBuffer(buffer);
                    sound1.setRefDistance(20);
                    sound1.play();
                });
                break;
            case "Bier":
                var sound1 = new THREE.PositionalAudio(this.gameCam.cameraListener);
                this.audioLoader.load('sounds/bier.wav', function (buffer) {
                    sound1.setBuffer(buffer);
                    sound1.setRefDistance(20);
                    sound1.play();
                });
                break;

        }

    }

    riptank() {

        var sound1 = new THREE.PositionalAudio(this.gameCam.cameraListener);
        this.audioLoader.load('sounds/boom.wav', function (buffer) {
            sound1.setBuffer(buffer);
            sound1.setRefDistance(20);
            sound1.play();
        });
    }
    
    setVolume(vol) {
        this.masterVolume = vol;

        for (var i = 0; i < this.sounds.length; i++) {
            this.sounds[i].setVolume(this.masterVolume);
        }
    }
}