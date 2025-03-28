import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Skips the next instruction if the key stored in VX(only consider the lowest nibble) is not pressed (usually the next instruction is a jump to skip a code block). - EXA1
 */
export class SkipIfKeyNotPressed extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xE0A1;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const key = di.vr.values[instruction.x];
        if (di.keypad.key !== key) {
            di.pc += 2;
        }
    }
}