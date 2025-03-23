import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {Sum} from "../../src/Instructions/Sum.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new Sum();

test("Instruction match", () => {
    expect(opcode.matches([0x8, 0x5, 0xE, 0x4])).toBeTrue();
    expect(opcode.matches([0x8, 0x5, 0xE, 0x0])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("add not occur", () => {
        di.vr.values[0x4] = 0x5;
        di.vr.values[0x5] = 0x3;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x4]);
        expect(di.vr.values[0x4]).toBe(0x8);
        expect(di.vr.values[0x5]).toBe(0x3);
        expect(di.vr.values[0xF]).toBe(0x0);
    });
    test("add occur", () => {
        di.vr.values[0x4] = 0x12;
        di.vr.values[0x5] = 0xFF;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x4]);
        expect(di.vr.values[0x4]).toBe(0x11);
        expect(di.vr.values[0x5]).toBe(0xFF);
        expect(di.vr.values[0xF]).toBe(0x1);
    });
});