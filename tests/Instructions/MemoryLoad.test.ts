import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {MemoryLoad} from "../../src/Instructions/MemoryLoad.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new MemoryLoad();

test("Instruction match", () => {
    expect(opcode.matches([0xF, 0x5, 0x6, 0x5])).toBeTrue();
    expect(opcode.matches([0xF, 0x0, 0xE, 0x9])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("load memory in registry ", () => {
        di.ir.value = 0x200;
        di.memory.setMultiple(0x200, [0x11, 0x55, 0x12]);
        opcode.execute(di, [0xF, 0x2, 0x6, 0x5]);
        expect(di.vr.values[0]).toEqual(0x11);
        expect(di.vr.values[1]).toEqual(0x55);
        expect(di.vr.values[2]).toEqual(0x12);
        expect(di.ir.value).toBe(0x200); // Ir don't change
    });
});