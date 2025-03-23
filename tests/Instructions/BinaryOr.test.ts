import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {BinaryOr} from "../../src/Instructions/BinaryOr.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new BinaryOr();

test("Instruction match", () => {
    expect(opcode.matches([0x8, 0x5, 0xE, 0x1])).toBeTrue();
    expect(opcode.matches([0x8, 0x5, 0xE, 0x0])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("or", () => {
        di.vr.values[0x4] = 0x5;
        di.vr.values[0x5] = 0x3;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x1]);
        expect(di.vr.values[0x4]).toBe(0x7);
        expect(di.vr.values[0x5]).toBe(0x3);
    });
});