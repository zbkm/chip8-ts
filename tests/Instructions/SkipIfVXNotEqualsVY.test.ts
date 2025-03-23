import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SkipIfVXNotEqualsVY} from "../../src/Instructions/SkipIfVXNotEqualsVY.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SkipIfVXNotEqualsVY();

test("Instruction match", () => {
    expect(opcode.matches([0x9, 0x5, 0xE, 0x0])).toBeTrue();
    expect(opcode.matches([0x9, 0x0, 0xE, 0x1])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("dont skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        di.vr.values[0x2] = 0xEE;
        opcode.execute(di, [0x5, 0x1, 0x2, 0x0]);
        expect(di.pc.value).toBe(0x0);
    });
    test("skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        opcode.execute(di, [0x5, 0x1, 0x6, 0x0]);
        expect(di.pc.value).toBe(0x2);
    });
});