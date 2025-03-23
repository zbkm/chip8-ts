import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Clear the screen - 00E0
 */
export class ClearScreenInstruction extends BaseInstruction {
    mask: number = 0xFFFF;
    value: number = 0x00E0;

    /**
     * @inheritDoc
     */
    execute(di: DI, _: Instruction): void {
        di.display.clear();
    }
}