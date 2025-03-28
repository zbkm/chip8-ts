import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Skip the following instruction if the value of register VX is equal to the value of register VY - 5XY0
 */
export class SkipIfRegistersNotEquals extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x9000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const vx = di.vr.get(instruction.x);
        const vy = di.vr.get(instruction.y);
        if (vx !== vy) {
            di.pc += 2;
        }
    }
}