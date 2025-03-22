export abstract class BaseTimer {
    public timer = 0;

    constructor() {
        setInterval(() => this.decrementTimer(), 1000 / 60)
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