import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Skip the following instruction if the value of register VX equals NN - 3XNN
 */
export class SkipIfEquals extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x3000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const vx = di.vr.values[instruction[1]];
        if (vx === ((instruction[2] << 4) | instruction[3])) {
            di.pc.value += 2;
        }
    }
}