export enum MEMORY_DEFAULT_VALUE {
    LARGE = 4096,
    RESERVED_BYTES = 0x200, // 512
    FONT_POSITION = 0x50 // Default font position 050 – 09F
}

export class Memory {
    protected data: Array<null | number> = [];

    /**
     * @param large Large memory in bytes. Default 4 kilobytes (4096 bytes)
     * @param reserved Reserved bytes in started. Default 512 bytes (like COSMAC VIP)
     */
    constructor(large: number = MEMORY_DEFAULT_VALUE.LARGE, reserved: number = MEMORY_DEFAULT_VALUE.RESERVED_BYTES) {
        this.data = new Array(large).fill(null);
        for (let i = 0; reserved - 1 > i; i++) {
            this.data[i] = 0;
        }
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
    public getMultiple(position: number, length: number): (number|null)[] {
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