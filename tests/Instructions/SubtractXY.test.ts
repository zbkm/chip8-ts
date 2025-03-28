import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {SubtractXY} from "../../src/Instructions/SubtractXY.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new SubtractXY();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E5))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("subtract not occur", () => {
        di.vr.set(0x4, 0x20);
        di.vr.set(0x5, 0x5);
        opcode.execute(di, new Instruction(0x8455));
        expect(di.vr.get(0x4)).toBe(0x1B);
        expect(di.vr.get(0x5)).toBe(0x5);
        expect(di.vr.get(0xF)).toBe(0x1);
    });
    test("subtract occur", () => {
        di.vr.set(0x4, 0x12);
        di.vr.set(0x5, 0xFF);
        opcode.execute(di, new Instruction(0x8455));
        expect(di.vr.get(0x4)).toBe(0x13);
        expect(di.vr.get(0x5)).toBe(0xFF);
        expect(di.vr.get(0xF)).toBe(0x0);
    });
});