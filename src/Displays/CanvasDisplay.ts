import {BaseDisplay} from "./BaseDisplay.ts";

export class CanvasDisplay extends BaseDisplay {
    cellSize = 10;

    constructor(protected ctx: CanvasRenderingContext2D) {
        super();
    }

    /**
     * @inheritDoc
     */
    render(): void {
        for (let y = 0; y < this.HEIGHT; y++) {
            for (let x = 0; x < this.WIDTH; x++) {
                if (this.state[x][y]) {
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }
}