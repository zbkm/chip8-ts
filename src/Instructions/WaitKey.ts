import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * A key press is awaited, and then stored in VX (blocking operation, all instruction halted until next key event, delay and sound timers should continue processing) - FX0A
 */
export class WaitKey extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF00A;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const key = di.vr.values[instruction.x];
        if (di.keypad.key !== key) {
            di.pc.value -= 2;
        }
    }
}