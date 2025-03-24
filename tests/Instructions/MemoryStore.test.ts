import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {MemoryStore} from "../../src/Instructions/MemoryStore.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new MemoryStore();

test("Instruction match", () => {
    expect(opcode.matches([0xF, 0x5, 0x5, 0x5])).toBeTrue();
    expect(opcode.matches([0xF, 0x0, 0xE, 0x9])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("save registry in memory", () => {
        di.ir.value = 0x200;
        di.vr.values[0] = 0x11;
        di.vr.values[1] = 0x55;
        di.vr.values[2] = 0x12;
        opcode.execute(di, [0xF, 0x2, 0x5, 0x5]);
        expect(di.ir.value).toBe(0x200); // Ir don't change
        expect(di.memory.getMultiple(0x200, 3)).toEqual([0x11, 0x55, 0x12]);
    });
});