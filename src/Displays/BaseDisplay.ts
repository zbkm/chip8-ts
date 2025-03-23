export abstract class BaseDisplay {
    public WIDTH = 64;
    public HEIGHT = 32;

    public state: boolean[][] = [];

    /**
     * Draw sprite in passed position
     * @param {number} x  X position
     * @param {number} y Y position
     * @param {Array<number>} sprite Bytes array with sprite
     */
    public drawSprite(x: number, y: number, sprite: number[]): void {
        x = x % this.WIDTH
        y = y % this.HEIGHT
        for (const row of sprite) {
            const bits = row.toString(2).padStart(8, "0").split("").map(bit => bit === "1");
            let localX = x;
            for (const bit of bits) {
                this.drawPixel(localX, y, bit);
                localX++;
            }
            y++;
        }

        this.render();
    }

    /**
     * Draw pixel in passed position
     * @dev New pixel state = logical XOR from old value and the new value
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} value New value
     */
    public drawPixel(x: number, y: number, value: boolean): void {
        if (x >= this.WIDTH || y > this.HEIGHT) return;
        this.state[x][y] = this.state[x][y] !== value;
    }

    /**
     * Clear display state
     */
    public clear(): void {
        this.state = Array.from({length: this.WIDTH}, () => new Array(this.HEIGHT).fill(false));
        this.render();
    }

    /**
     * Render display
     */
    public abstract render(): void;
}