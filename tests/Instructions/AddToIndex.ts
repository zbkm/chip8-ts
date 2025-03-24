import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {AddToIndex} from "../../src/Instructions/AddToIndex.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new AddToIndex();

test("Instruction match", () => {
    expect(opcode.matches([0xF, 0x5, 0x1, 0xE])).toBeTrue();
    expect(opcode.matches([0xF, 0x0, 0xE, 0x0])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("add value to i register", () => {
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.vr.values[1]).toBe(0x0);
        di.vr.values[1] = 0x100;
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.vr.values[1]).toBe(0x100);
        di.vr.values[1] = 0x100;
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.vr.values[1]).toBe(0x200);
    });
    test("overflow", () => {
        di.ir.value = 0xFFFF;
        di.vr.values[1] = 0x1;
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.vr.values[1]).toBe(0x0);
    });
});