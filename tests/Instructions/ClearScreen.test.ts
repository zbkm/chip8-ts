import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {ClearScreen} from "../../src/Instructions/ClearScreen.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display.clear();
const opcode = new ClearScreen();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x00E0))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("clear", () => {
        di.display.drawPixel(1, 1, true);
        opcode.execute(di, new Instruction(0x00E0));
        expect(di.display.state.some(row => row.includes(true))).toBeFalse();
    });
});