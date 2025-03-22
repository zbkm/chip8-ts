import {Stack} from "./Stack.ts";
import {Memory, MEMORY_DEFAULT_VALUE} from "./Memory.ts";
import {IndexRegister} from "./IndexRegister.ts";
import {VariableRegisters} from "./VariableRegisters.ts";
import {BaseDisplay} from "./Displays/BaseDisplay.ts";
import {BaseFont} from "./Fonts/BaseFont.ts";
import {ConsoleDisplay} from "./Displays/ConsoleDisplay.ts";
import {DefaultFont} from "./Fonts/DefaultFont.ts";


type EmulatorOptions = {
    stack: Stack,
    memory: Memory,
    ir: IndexRegister,
    vr: VariableRegisters,
    display: BaseDisplay,
    font: BaseFont
}

const defaultEmulatorOptions: EmulatorOptions = {
    display: new ConsoleDisplay(),
    font: new DefaultFont(),
    ir: new IndexRegister(),
    memory: new Memory(),
    stack: new Stack(),
    vr: new VariableRegisters()
};

export class Emulator {
    di: EmulatorOptions;

    /**
     * @param options {EmulatorOptions} Object with dependencies. All optional
     */
    constructor(options?: Partial<EmulatorOptions>) {
        this.di = Object.assign({}, defaultEmulatorOptions, options);
    }

    /**
     * Run program
     * @param program {number[]} Program bytes
     */
    run(program: number[]) {
        let pc = MEMORY_DEFAULT_VALUE.RESERVED_BYTES;
        this.di.memory.setMultiple(MEMORY_DEFAULT_VALUE.RESERVED_BYTES, program);


        while (true) {
            const instructions: [number, number, number, number] = [
                (this.di.memory.get(pc)! >> 4) & 0xF,
                this.di.memory.get(pc)! & 0xF,
                (this.di.memory.get(pc + 1)! >> 4) & 0xF,
                this.di.memory.get(pc + 1)! & 0xF,
            ];
            pc = pc + 2;

            switch (instructions[0]) {
                case 0x0:
                    if (instructions[1] == 0x0 && instructions[2] == 0xE && instructions[3] == 0x0) // clear display
                        this.di.display.clear();
                    break;
                case 0x1: // jump
                    pc = (instructions[1] << 8) | (instructions[2] << 4) | instructions[3];
                    break;
                case 0x6: // set register VX
                    this.di.vr.values[instructions[1]] = (instructions[2] << 4) | instructions[3];
                    break;
                case 0x7: // Adds NN to VX
                    this.di.vr.values[instructions[1]] += (instructions[2] << 4) | instructions[3];
                    break;
                case 0xA: // Sets I to the address NNN
                    this.di.ir.value = (instructions[1] << 8) | (instructions[2] << 4) | instructions[3];
                    break;
                case 0xD: // draw
                    const x = this.di.vr.values[instructions[1]];
                    const y = this.di.vr.values[instructions[2]];
                    const sprite: number[] = this.di.memory.getMultiple(this.di.ir.value, instructions[3]) as number[];
                    this.di.display.drawSprite(x, y, sprite);
                    break;
            }
        }
    }
}