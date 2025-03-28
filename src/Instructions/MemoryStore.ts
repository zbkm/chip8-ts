import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Store the values of registers V0 to VX inclusive in memory starting at address I
 * I is set to I + X + 1 after operation - FX55
 */
export class MemoryStore extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF055;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        for (let i = 0; instruction.x >= i; i++) {
            di.memory.save(i + di.ir, di.vr.get(i));
        }

        // The original CHIP-8 interpreter for the COSMAC VIP actually incremented the I register while it worked
    }
}