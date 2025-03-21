export class Memory {
    protected data: Array<null | number> = [];

    /**
     * @param large Large memory in bytes. Default 4 kilobytes (4096 bytes)
     * @param reserved Reserved bytes in started. Default 512 bytes (like COSMAC VIP)
     */
    constructor(large: number = 4096, reserved: number = 512) {
        this.data = new Array(large).fill(null);
        for (let i = 0; reserved - 1 > i; i++) {
            this.data[i] = 0;
        }
    }

    /**
     * Save data in memory
     * @param position Position in hex string
     * @param value
     */
    public save(position: number, value: number) {
        this.data[position - 1] = value;
    }

    /**
     * Get data from memory
     * @param position Position in hex string
     */
    public get(position: number): number | null {
        return this.data[position - 1];
    }
}