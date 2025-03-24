import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {AddToIndex} from "../../src/Instructions/AddToIndex.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new AddToIndex();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF51E))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF0E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("add value to i register", () => {
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.ir.value).toBe(0x0);
        di.vr.values[1] = 0x100;
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.ir.value).toBe(0x100);
        di.vr.values[1] = 0x100;
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.ir.value).toBe(0x200);
    });
    test("overflow", () => {
        di.ir.value = 0xFFFF;
        di.vr.values[1] = 0x1;
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.ir.value).toBe(0x0);
    });
});