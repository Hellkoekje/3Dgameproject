class Timer {
    constructor(timeteller) {
        this.minutes = 10;
        this.seconds = 0;
        this.counter = 600;
        this.timer = document.getElementById("timer");
        this.timer.innerHTML = this.minutes + ":" + this.seconds;
        this.timeIt(timeteller);
        setInterval(() => { this.timeIt(); }, 1000);    }
    
    timeIt() {
        
        if (this.seconds <= 0) {
            this.seconds = 59;
            this.minutes--;
            timer.innerHTML = this.minutes + ":" + this.seconds;

        }
        else if (this.seconds <= 10) {
            timer.innerHTML = this.minutes + ":0" + this.seconds;
        }
        else if (this.counter == 0) {
            timer.innerHTML = "Time is up";
            return;
        }
        this.seconds--;
        this.counter--;
        timer.innerHTML = this.minutes + ":" + this.seconds;

        //
    }
}
