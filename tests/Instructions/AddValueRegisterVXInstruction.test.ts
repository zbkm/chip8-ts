import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {AddValueRegisterVXInstruction} from "../../src/Instructions/AddValueRegisterVXInstruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new AddValueRegisterVXInstruction();

test("Instruction match", () => {
    expect(opcode.matches([0x7, 0x5, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("add value to register", () => {
        opcode.execute(di, [0x0, 0x1, 0x1, 0x2]);
        expect(di.vr.values[1]).toBe(0x12);
        opcode.execute(di, [0x0, 0x1, 0xF, 0xF]);
        expect(di.vr.values[1]).toBe(0x11);
    });
});