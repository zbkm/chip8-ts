import {MEMORY_DEFAULT_VALUE} from "./Memory.ts";
import type {DI} from "./types.ts";
import {defaultEmulatorOptions} from "./utils/options.ts";

export class Emulator {
    di: DI;

    /**
     * @param options {DI?} Object with dependencies. All optional
     */
    constructor(options?: Partial<DI>) {
        this.di = Object.assign({}, defaultEmulatorOptions(), options);
    }

    /**
     * Run program
     * @param program {number[]} Program bytes
     */
    async run(program: number[]) {
        let pc = MEMORY_DEFAULT_VALUE.RESERVED_BYTES;
        this.di.memory.setMultiple(MEMORY_DEFAULT_VALUE.RESERVED_BYTES, program);
        this.di.display.clear();

        while (true) {
            const instruction: [number, number, number, number] = [
                (this.di.memory.get(pc)! >> 4) & 0xF,
                this.di.memory.get(pc)! & 0xF,
                (this.di.memory.get(pc + 1)! >> 4) & 0xF,
                this.di.memory.get(pc + 1)! & 0xF,
            ];
            pc = pc + 2;
            // console.log(instruction.map(e => e.toString(16)).join(""), "-", instruction.join(","))
            const opcode = this.di.instructions.find(instr => instr.matches(instruction));

            if (opcode) {
                opcode.execute(this.di, instruction);
            }


            await new Promise(r => setTimeout(r, 2));
        }
    }
}