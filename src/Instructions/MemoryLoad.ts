import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Fill registers V0 to VX inclusive with the values stored in memory starting at address I - FX65
 */
export class MemoryLoad extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF065;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        for (let i = 0; instruction[1] >= i; i++) {
            di.vr.values[i] = di.memory.get(i + di.ir.value) ?? 0;
        }

        // The original CHIP-8 interpreter for the COSMAC VIP actually incremented the I register while it worked
    }
}