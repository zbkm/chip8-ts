import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {BinaryXor} from "../../src/Instructions/BinaryXor.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new BinaryXor();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E3))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("or", () => {
        di.vr.set(0x4, 0x5);
        di.vr.set(0x5, 0x3);
        opcode.execute(di, new Instruction(0x8453));
        expect(di.vr.get(0x4)).toBe(0x6);
        expect(di.vr.get(0x5)).toBe(0x3);
    });
});