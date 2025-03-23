import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Jump to address NNN + V0 - BNNN
 */
export class JumpWithOffset extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0xB000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.pc.value = ((instruction[1] << 8) | (instruction[2] << 4) | instruction[3]) + di.vr.values[0];
    }
}