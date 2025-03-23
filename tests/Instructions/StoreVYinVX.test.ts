import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {StoreVYinVX} from "../../src/Instructions/StoreVYinVX.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new StoreVYinVX();

test("Instruction match", () => {
    expect(opcode.matches([0x8, 0x5, 0xE, 0x0])).toBeTrue();
    expect(opcode.matches([0x8, 0x5, 0xE, 0x1])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("store vy in vx", () => {
        di.vr.values[0x4] = 0xE;
        di.vr.values[0x5] = 0xF;
        opcode.execute(di, [0x8, 0x4, 0x5, 0x0]);
        expect(di.vr.values[0x4]).toBe(0xF);
        expect(di.vr.values[0x5]).toBe(0xF);
    });
});