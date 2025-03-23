import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Set VX to a random number with a mask of NN - CXNN
 */
export class Random extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0xC000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction[1]] = Math.floor(Math.random() * 0xFF) & ((instruction[2] << 4) | instruction[3]);
    }
}