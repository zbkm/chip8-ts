import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SubtractYX} from "../../src/Instructions/SubtractYX.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SubtractYX();

test("Instruction match", () => {
    expect(opcode.matches([0x8, 0x5, 0xE, 0x7])).toBeTrue();
    expect(opcode.matches([0x8, 0x5, 0xE, 0x0])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("subtract not occur", () => {
        di.vr.values[0x4] = 0x5;
        di.vr.values[0x5] = 0x20;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x4]);
        expect(di.vr.values[0x4]).toBe(0x1b);
        expect(di.vr.values[0x5]).toBe(0x20);
        expect(di.vr.values[0xF]).toBe(0x1);
    });
    test("subtract occur", () => {
        di.vr.values[0x4] = 0x20;
        di.vr.values[0x5] = 0x10;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x4]);
        expect(di.vr.values[0x4]).toBe(0xF0);
        expect(di.vr.values[0x5]).toBe(0x10);
        expect(di.vr.values[0xF]).toBe(0x0);
    });
});