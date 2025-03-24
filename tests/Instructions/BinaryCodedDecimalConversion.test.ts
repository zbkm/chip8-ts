import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {BinaryCodedDecimalConversion} from "../../src/Instructions/BinaryCodedDecimalConversion.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new BinaryCodedDecimalConversion();

test("Instruction match", () => {
    expect(opcode.matches([0xF, 0x5, 0x3, 0x3])).toBeTrue();
    expect(opcode.matches([0xF, 0x0, 0x3, 0x0])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("bcd", () => {
        di.ir.value = 0x250;
        di.vr.values[1] = 0x9C;
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.memory.get(0x250)).toBe(0x1);
        expect(di.memory.get(0x251)).toBe(0x5);
        expect(di.memory.get(0x252)).toBe(0x6);
    });
});