/**
 * @name Instruction
 * @description Representation for instructions for extraction of values from them
 */
export class Instruction {
    /**
     * @param instruction {number} instruction value
     */
    constructor(protected instruction: number) {
    }

    /**
     * Get full instruction value
     * @returns {number} instruction value
     */
    get full(): number {
        return this.instruction;
    }

    /**
     * Get X value (the second nibble)
     * @returns {number} X
     */
    get x(): number {
        return (this.instruction >> 8) & 0xF;
    }

    /**
     * Get Y value (the third nibble)
     * @returns {number} Y
     */
    get y(): number {
        return (this.instruction >> 4) & 0xF;
    }

    /**
     * Get N value (the fourth nibble)
     * @returns {number} N
     */
    get n(): number {
        return this.instruction & 0xF;
    }

    /**
     * Get NN (the second byte - third and fourth nibbles)
     * @returns {number} NN
     */
    get nn(): number {
        return this.instruction & 0xFF;
    }

    /**
     * Get NNN (the second, third and fourth nibbles)
     * @returns {number} NNN
     */
    get nnn(): number {
        return this.instruction & 0xFFF;
    }
}