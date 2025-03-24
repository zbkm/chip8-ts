export abstract class BaseTimer {
    public timer = 0;
    public interval: Timer | undefined;

    constructor() {
        this.interval = setInterval(() => this.decrementTimer(), 1000 / 60);
    }

    /**
     * Stop timer
     */
    public stop() {
        clearInterval(this.interval);
    }

    /**
     * Decreasing the timer by one unit
     * @protected
     */
    protected decrementTimer(): void {
        if (this.timer > 0) {
            this.timer--;
            this.onTick();
        }
    }

    /**
     * Executed every tick when timer is greater than zero
     * @protected
     */
    protected abstract onTick(): void;
}