import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        const vx = di.vr.get(instruction.x);
        if (vx === instruction.nn) {
            di.pc += 2;
        }
    }
}