import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Store the current value of the delay timer in register VX - FX07
 */
export class TimerDelayGet extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF007;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.set(instruction.x, di.delay.timer);
    }
}