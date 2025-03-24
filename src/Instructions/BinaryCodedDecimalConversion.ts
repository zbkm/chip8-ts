import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Store the binary-coded decimal equivalent of the value stored in register VX at addresses I, I + 1, and I + 2 - FX33
 */
export class BinaryCodedDecimalConversion extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF033;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const number = di.vr.values[instruction[1]];

        di.memory.save(di.ir.value, ~~(number / 100));
        di.memory.save(di.ir.value + 1, ~~(number / 10 % 10));
        di.memory.save(di.ir.value + 2, number % 10);
    }
}