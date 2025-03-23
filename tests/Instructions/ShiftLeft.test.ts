import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {ShiftLeft} from "../../src/Instructions/ShiftLeft.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new ShiftLeft();

test("Instruction match", () => {
    expect(opcode.matches([0x8, 0x5, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x8, 0x5, 0xE, 0x0])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("shift", () => {
        di.vr.values[0x4] = 0x20;
        di.vr.values[0x5] = 0x5;
        opcode.execute(di, [0x8, 0x4, 0x5, 0xE]);
        expect(di.vr.values[0x4]).toBe(0xA);
        expect(di.vr.values[0x5]).toBe(0x5);
        expect(di.vr.values[0xF]).toBe(0x0);
    });
    test("shift 2", () => {
        di.vr.values[0x4] = 0x10;
        di.vr.values[0x5] = 0xFE;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x4]);
        expect(di.vr.values[0x4]).toBe(0xFC);
        expect(di.vr.values[0x5]).toBe(0xFE);
        expect(di.vr.values[0xF]).toBe(0x1);
    });
});