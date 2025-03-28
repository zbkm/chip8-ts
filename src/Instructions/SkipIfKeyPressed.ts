import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Skips the next instruction if the key stored in VX(only consider the lowest nibble) is pressed (usually the next instruction is a jump to skip a code block). - EX9E
 */
export class SkipIfKeyPressed extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xE09E;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const key = di.vr.get(instruction.x);
        if (di.keypad.key === key) {
            di.pc += 2;
        }
    }
}