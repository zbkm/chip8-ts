import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Set the delay timer to the value of register VX - FX15
 */
export class TimerDelaySet extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF015;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.delay.timer = di.vr.get(instruction.x);
    }
}