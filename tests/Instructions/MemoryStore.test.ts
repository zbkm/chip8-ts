import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {MemoryStore} from "../../src/Instructions/MemoryStore.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new MemoryStore();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF555))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF0E9))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("save registry in memory", () => {
        di.ir = 0x200;
        di.vr.set(0, 0x11);
        di.vr.set(1, 0x55);
        di.vr.set(2, 0x12);
        opcode.execute(di, new Instruction(0xF255));
        expect(di.ir).toBe(0x200); // Ir don't change
        expect(di.memory.getMultiple(0x200, 3)).toEqual([0x11, 0x55, 0x12]);
    });
});