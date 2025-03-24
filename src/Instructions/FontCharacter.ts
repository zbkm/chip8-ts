import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Set I to the memory address of the sprite data corresponding to the hexadecimal digit stored in register VX - FX29
 */
export class FontCharacter extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF029;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const characterSymbol = di.vr.values[instruction[1]] & 0xF; // An 8-bit register can hold two hexadecimal numbers, but this would only point to one character
        di.ir.value = di.memory.info.font + characterSymbol * 0x5;
    }
}