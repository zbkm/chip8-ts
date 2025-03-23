import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Return from a subroutine - 00EE
 */
export class SubroutineReturn extends BaseInstruction {
    mask: number = 0xFFFF;
    value: number = 0x00EE;

    /**
     * @inheritDoc
     */
    execute(di: DI, _: Instruction): void {
        di.pc.value = di.stack.pop();
    }
}