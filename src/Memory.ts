import type {MemoryInfo} from "./types.ts";

export class Memory {
    protected data: Array<number> = [];
    protected _info: MemoryInfo = {
        large: 4096,
        reserved: 0x200,
        font: 0x50
    };

    /**
     * @param info {MemoryInfo?}
     */
    constructor(info?: MemoryInfo) {
        this._info = Object.assign({}, this._info, info);
        this.data = new Array(this.info.large).fill(0);
    }

    /**
     * Memory Info
     * @return {MemoryInfo}
     */
    get info(): MemoryInfo {
        return this._info;
    }

    /**
     * Save data in memory
     * @param position Position
     * @param value
     */
    public save(position: number, value: number): void {
        this.data[position - 1] = value;
    }

    /**
     * Get data from memory
     * @param position Element position
     * @returns {number} value
     */
    public get(position: number): number {
        return this.data[position - 1];
    }

    /**
     * Get multiple values from memory
     * @param position {number} Start elements position
     * @param length {number} Length
     * @returns {number[]} values
     */
    public getMultiple(position: number, length: number): number[] {
        return this.data.slice(position - 1, position - 1 + length);
    }

    /**
     * Save an array of bytes in memory
     *
     * @param position Starting position of the save
     * @param values Array with byte values
     */
    public setMultiple(position: number, values: number[]): void {
        for (const value of values) {
            this.save(position, value);
            position++;
        }
    }
}