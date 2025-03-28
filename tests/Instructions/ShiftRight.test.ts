import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {ShiftRight} from "../../src/Instructions/ShiftRight.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new ShiftRight();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E6))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("shift", () => {
        di.vr.set(0x4, 0x20);
        di.vr.set(0x5, 0x5);
        opcode.execute(di, new Instruction(0x8456));
        expect(di.vr.get(0x4)).toBe(0x2);
        expect(di.vr.get(0x5)).toBe(0x5);
        expect(di.vr.get(0xF)).toBe(0x1);
    });
    test("shift 2", () => {
        di.vr.set(0x4, 0x10);
        di.vr.set(0x5, 0xFE);
        opcode.execute(di, new Instruction(0x8456));
        expect(di.vr.get(0x4)).toBe(0x7F);
        expect(di.vr.get(0x5)).toBe(0xFE);
        expect(di.vr.get(0xF)).toBe(0x0);
    });
});