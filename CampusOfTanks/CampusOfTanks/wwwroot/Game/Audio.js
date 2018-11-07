// The audio component is responsible for handling music and sfx, as well volume control.
class Audio {

    /**
     * @param {float} masterVolume The starting volume for all sounds/music.
     */
    constructor(masterVolume) {

        this.masterVolume = 0.5;
        this.sounds = [];

        //Add audio listener to our camera.
        this.gameCam = registry.components.camera;
        this.sound = new THREE.Audio(this.gameCam.cameraListener);

        //Instantiate the background music
        this.audioLoader = new THREE.AudioLoader();
        this.audioLoader.load('/sounds/Iron.mp3', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setLoop(true);
            this.sound.play();
        });

        this.sounds.push(this.sound);
        this.setVolume(masterVolume);
    }

    /**
     * Play the sound for an projective
     * @param {Projectile} projectile THe projectile we want to play an audio for.
     */
    shoot(projectile) {
        var psound = new THREE.PositionalAudio(this.gameCam.cameraListener);

        //Find which sound we want to play based on project tile
        switch (projectile) {
            case "Ei":
                this.audioLoader.load('sounds/ei.wav', function (buffer) {
                    psound.setBuffer(buffer);
                    psound.setRefDistance(20);
                    psound.play();
                });
                break;
            case "Appel":
                this.audioLoader.load('sounds/appel.wav', function (buffer) {
                    psound.setBuffer(buffer);
                    psound.setRefDistance(20);
                    psound.play();
                });
                break;
            case "Bier":
                this.audioLoader.load('sounds/bier.wav', function (buffer) {
                    psound.setBuffer(buffer);
                    psound.setRefDistance(20);
                    psound.play();
                });
                break;
        }
    }

    /**
     * Play the player tank dying sound.
    */
    riplocaltank() {
        var sound1 = new THREE.PositionalAudio(this.gameCam.cameraListener);
        this.audioLoader.load('sounds/death.oga', function (buffer) {
            sound1.setBuffer(buffer);
            sound1.setRefDistance(20);
            sound1.play();
        });

    }

    /**
     * Play a sound for an enemy tank dying.
    */
    riptank() {
        var sound1 = new THREE.PositionalAudio(this.gameCam.cameraListener);
        this.audioLoader.load('sounds/boom.wav', function (buffer) {
            sound1.setBuffer(buffer);
            sound1.setRefDistance(20);
            sound1.play();
        });
    }

    /**
     * Set the sound for all the sounds.
     * @param {interger} vol The target volume.
     */
    setVolume(vol) {
        this.masterVolume = vol;

        for (var i = 0; i < this.sounds.length; i++) {
            this.sounds[i].setVolume(this.masterVolume);
        }
    }
}