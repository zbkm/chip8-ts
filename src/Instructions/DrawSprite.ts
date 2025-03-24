import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Draw a sprite at position VX, VY with N bytes of sprite data starting at the address stored in I
 * Set VF to 01 if any set pixels are changed to unset, and 00 otherwise - DXYN
 */
export class DrawSprite extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0xD000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const x = di.vr.values[instruction.x];
        const y = di.vr.values[instruction.y];
        const sprite: number[] = di.memory.getMultiple(di.ir.value, instruction.n) as number[];
        di.vr.values[0xF] = +di.display.drawSprite(x, y, sprite);
    }
}