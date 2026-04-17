class PomodoroTimer {
    constructor(onTick, onComplete) {
        this.duration = 1500;
        this.timeRemaining = 1500;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.intervalId = null;
    }
    setDuration(seconds) {
        this.duration = seconds;
        this.timeRemaining = seconds;
        this.onTick(this.timeRemaining);
    }
    start() {
        if (this.intervalId || this.timeRemaining <= 0) return;
        this.intervalId = setInterval(() => {
            this.timeRemaining--;
            this.onTick(this.timeRemaining);
            if (this.timeRemaining <= 0) {
                this.pause();
                this.onComplete();
            }
        }, 1000);
    }
    pause() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    reset() {
        this.pause();
        this.timeRemaining = this.duration;
        this.onTick(this.timeRemaining);
    }
}