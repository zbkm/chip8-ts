import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {BinaryOr} from "../../src/Instructions/BinaryOr.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new BinaryOr();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E1))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("or", () => {
        di.vr.set(0x4, 0x5);
        di.vr.set(0x5, 0x3);
        opcode.execute(di, new Instruction(0x8451));
        expect(di.vr.get(0x4)).toBe(0x7);
        expect(di.vr.get(0x5)).toBe(0x3);
    });
});