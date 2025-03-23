import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Set the sound timer to the value of register VX - FX18
 */
export class TimerSoundSet extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF018;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.timers.sound.timer = di.vr.values[instruction[1]];
    }
}