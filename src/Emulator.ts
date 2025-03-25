import type {DI} from "./types.ts";
import {defaultEmulatorOptions} from "./utils/options.ts";
import {Instruction} from "./Instruction.ts";

export class Emulator {
    di: DI;
    timer: Timer | undefined;

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
    public async run(program: number[]) {
        this.di.pc.value = this.di.memory.info.reserved;
        this.di.memory.setMultiple(this.di.memory.info.reserved, program);
        this.di.display.clear();

        this.timer = setInterval(this.step, this.di.interval);
    }

    /**
     * Stop program
     */
    public stop() {
        clearInterval(this.timer!);
        this.di.sound.stop();
        this.di.delay.stop();
    }

    /**
     * Execution step
     * @protected
     */
    protected step = async () => {
        const instruction = new Instruction(this.di.memory.get(this.di.pc.value)! << 8 | this.di.memory.get(this.di.pc.value + 1)!);

        this.di.pc.value = this.di.pc.value + 2;
        const opcode = this.di.instructions.find(instr => instr.matches(instruction));

        if (opcode) {
            opcode.execute(this.di, instruction);
        }
    };
}