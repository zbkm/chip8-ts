import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SkipIfNotEquals} from "../../src/Instructions/SkipIfNotEquals.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SkipIfNotEquals();

test("Instruction match", () => {
    expect(opcode.matches([0x4, 0x5, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        opcode.execute(di, [0x4, 0x1, 0xE, 0xE]);
        expect(di.pc.value).toBe(0x0);
    });
    test("dont skip instruction", () => {
        di.pc.value = 0x0;
        opcode.execute(di, [0x4, 0x4, 0xE, 0xE]);
        expect(di.pc.value).toBe(0x2);
    });
});