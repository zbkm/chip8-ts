/**
 * Stack CHIP-8
 */
export class Stack {
    protected data: number[] = [];

    /**
     * Push value in stack
     * @param {number} value Element value
     */
    public push(value: number): void {
        this.data.push(value);
    }

    /**
     * Get last element in stack
     * @returns {number} Element value
     */
    public pop(): number {
        return this.data.pop()!;
    }
}