export class VariableRegisters {
    protected values: number[] = new Array(16).fill(0);

    /**
     * Get variable register value
     * @param position {number} register position
     * @returns {number} register value
     */
    public get(position: number): number {
        return this.values[position];
    }

    /**
     * Set variable register value
     * @param position {number} register position
     * @param value {number} register value
     */
    public set(position: number, value: number): void {
        this.values[position] = value;
    }
}