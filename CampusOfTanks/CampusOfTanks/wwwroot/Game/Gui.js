//GUI that is on screen.
class Gui {
    constructor() {
        var guiControls = new function () {
            this.setVolume = 0.25;
        };

        this.gui = new dat.GUI();
        var volSlider = this.gui.add(guiControls, 'setVolume', 0, 1);

        volSlider.onChange(function (value) {
            var audio = registry.components.audio;
            audio.setVolume(value / 10);
        });
    }
}