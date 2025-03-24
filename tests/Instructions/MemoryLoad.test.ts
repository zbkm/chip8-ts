import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {MemoryLoad} from "../../src/Instructions/MemoryLoad.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new MemoryLoad();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF565))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF0E9))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("load memory in registry ", () => {
        di.ir.value = 0x200;
        di.memory.setMultiple(0x200, [0x11, 0x55, 0x12]);
        opcode.execute(di, new Instruction(0xF265));
        expect(di.vr.values[0]).toEqual(0x11);
        expect(di.vr.values[1]).toEqual(0x55);
        expect(di.vr.values[2]).toEqual(0x12);
        expect(di.ir.value).toBe(0x200); // Ir don't change
    });
});