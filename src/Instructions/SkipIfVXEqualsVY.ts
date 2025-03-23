import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Skip the following instruction if the value of register VX is equal to the value of register VY - 5XY0
 */
export class SkipIfVXEqualsVY extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x5000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const vx = di.vr.values[instruction[1]];
        const vy = di.vr.values[instruction[2]];
        if (vx === vy) {
            di.pc.value += 2;
        }
    }
}