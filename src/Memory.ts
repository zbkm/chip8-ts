type MemoryInfo = {
    large: number,
    reserved: number,
    font: number
}

const defaultPosition: MemoryInfo = {
    large: 4096,
    reserved: 0x200,
    font: 0x50
};

export class Memory {
    protected data: Array<null | number> = [];

    /**
     * @param info {MemoryInfo?}
     */
    constructor(info?: MemoryInfo) {
        this._info = Object.assign({}, defaultPosition, info);

        this.data = new Array(this.info.large).fill(null);
        for (let i = 0; this.info.reserved - 1 > i; i++) {
            this.data[i] = 0;
        }
    }

    protected _info: MemoryInfo;

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
    public save(position: number, value: number) {
        this.data[position - 1] = value;
    }

    /**
     * Get data from memory
     * @param position Element position
     */
    public get(position: number): number | null {
        return this.data[position - 1];
    }

    /**
     * Get multiple values from memory
     * @param position {number} Start elements position
     * @param length {number} Length
     */
    public getMultiple(position: number, length: number): (number | null)[] {
        return this.data.slice(position - 1, position - 1 + length);
    }

    /**
     * Save an array of bytes in memory
     *
     * @param position Starting position of the save
     * @param values Array with byte values
     */
    public setMultiple(position: number, values: number[]) {
        for (const value of values) {
            this.save(position, value);
            position++;
        }
    }
}