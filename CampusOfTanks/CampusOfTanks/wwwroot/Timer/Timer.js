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
        
        //als seconden onder de 10 komt
        if (this.seconds < 10) {
            timer.innerHTML = this.minutes + ":0" + this.seconds;
            //als de seconden onder 0 komen
            if (this.seconds < 0) {
                this.seconds = 59;
                this.minutes--;
                timer.innerHTML = this.minutes + ":" + this.seconds;

            }
            //als de tijd om is
            else if (this.counter == 0) {
                timer.innerHTML = "Time is up";
                return;
            }
        }
        //geeft de timer weer
        else { timer.innerHTML = this.minutes + ":" + this.seconds; }

       
        //elke tik 1 seconde en counter minder
        this.seconds--;
        this.counter--;

        
    }
}
