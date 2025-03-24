import type {DI} from "./types.ts";
import {defaultEmulatorOptions} from "./utils/options.ts";

export class Emulator {
    di: DI;

    /**
     * @param options {DI?} Object with dependencies. All optional
     */
    constructor(options?: Partial<DI>) {
        this.di = Object.assign({}, defaultEmulatorOptions(), options);
        this.di.memory.setMultiple(this.di.memory.info.font, this.di.font.bytes());
    }

    /**
     * Run program
     * @param program {number[]} Program bytes
     */
    async run(program: number[]) {
        this.di.pc.value = this.di.memory.info.reserved;
        this.di.memory.setMultiple(this.di.memory.info.reserved, program);
        this.di.display.clear();

        while (true) {
            const instruction: [number, number, number, number] = [
                (this.di.memory.get(this.di.pc.value)! >> 4) & 0xF,
                this.di.memory.get(this.di.pc.value)! & 0xF,
                (this.di.memory.get(this.di.pc.value + 1)! >> 4) & 0xF,
                this.di.memory.get(this.di.pc.value + 1)! & 0xF,
            ];
            this.di.pc.value = this.di.pc.value + 2;
            const opcode = this.di.instructions.find(instr => instr.matches(instruction));

            if (opcode) {
                opcode.execute(this.di, instruction);
            }

            await new Promise(r => setTimeout(r, 2));
        }
    }
}