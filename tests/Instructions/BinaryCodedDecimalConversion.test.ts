import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {BinaryCodedDecimalConversion} from "../../src/Instructions/BinaryCodedDecimalConversion.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new BinaryCodedDecimalConversion();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF533))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF030))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("bcd", () => {
        di.ir = 0x250;
        di.vr.set(1, 0x9C);
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.memory.get(0x250)).toBe(0x1);
        expect(di.memory.get(0x251)).toBe(0x5);
        expect(di.memory.get(0x252)).toBe(0x6);
    });
});