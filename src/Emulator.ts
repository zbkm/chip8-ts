import type {DI} from "./types.ts";
import {defaultEmulatorOptions} from "./utils/options.ts";
import {Instruction} from "./Instruction.ts";

export class Emulator {
    di: DI;
    timer: Timer | undefined;

    /**
     * @param options {DI?} Object with dependencies. All optional
     * @param program {number[]} Program bytes
     */
    constructor(program: number[], options?: Partial<DI>) {
        this.di = Object.assign({}, defaultEmulatorOptions(), options);
        this.di.memory.setMultiple(this.di.memory.info.font, this.di.font.bytes());

        this.di.pc = this.di.memory.info.reserved;
        this.di.memory.setMultiple(this.di.memory.info.reserved, program);
        this.di.display.clear();
    }

    /**
     * Start program
     */
    public async run() {
        this.timer = setInterval(this.step, this.di.interval);
        this.di.sound.start();
        this.di.delay.start();
    }

    /**
     * Stop program
     */
    public stop() {
        clearInterval(this.timer);
        this.di.sound.stop();
        this.di.delay.stop();
    }

    /**
     * Execution step
     */
    public step = async () => {
        const instruction = new Instruction(
            this.di.memory.get(this.di.pc) << 8 | this.di.memory.get(this.di.pc + 1)
        );

        this.di.pc = this.di.pc + 2;
        const opcode = this.di.instructions.find(instr => instr.matches(instruction));

        if (opcode) {
            opcode.execute(this.di, instruction);
        }
    };
}