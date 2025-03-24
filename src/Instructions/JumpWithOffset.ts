import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        di.pc.value = instruction.nnn + di.vr.values[0];
    }
}