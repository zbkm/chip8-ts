import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {SubtractYX} from "../../src/Instructions/SubtractYX.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new SubtractYX();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E7))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("subtract not occur", () => {
        di.vr.set(0x4, 0x5);
        di.vr.set(0x5, 0x20);
        opcode.execute(di, new Instruction(0x8457));
        expect(di.vr.get(0x4)).toBe(0x1b);
        expect(di.vr.get(0x5)).toBe(0x20);
        expect(di.vr.get(0xF)).toBe(0x1);
    });
    test("subtract occur", () => {
        di.vr.set(0x4, 0x20);
        di.vr.set(0x5, 0x10);
        opcode.execute(di, new Instruction(0x8457));
        expect(di.vr.get(0x4)).toBe(0xF0);
        expect(di.vr.get(0x5)).toBe(0x10);
        expect(di.vr.get(0xF)).toBe(0x0);
    });
});