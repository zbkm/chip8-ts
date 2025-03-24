import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {ShiftLeft} from "../../src/Instructions/ShiftLeft.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new ShiftLeft();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("shift", () => {
        di.vr.values[0x4] = 0x20;
        di.vr.values[0x5] = 0x5;
        opcode.execute(di, new Instruction(0x845E));
        expect(di.vr.values[0x4]).toBe(0xA);
        expect(di.vr.values[0x5]).toBe(0x5);
        expect(di.vr.values[0xF]).toBe(0x0);
    });
    test("shift 2", () => {
        di.vr.values[0x4] = 0x10;
        di.vr.values[0x5] = 0xFE;
        opcode.execute(di, new Instruction(0x8454));
        expect(di.vr.values[0x4]).toBe(0xFC);
        expect(di.vr.values[0x5]).toBe(0xFE);
        expect(di.vr.values[0xF]).toBe(0x1);
    });
});