import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        const randomResult = Math.floor(Math.random() * 0xFF) & instruction.nn;
        di.vr.set(instruction.x, randomResult);
    }
}