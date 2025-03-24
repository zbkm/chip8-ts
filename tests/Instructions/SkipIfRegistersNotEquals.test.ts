import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SkipIfRegistersNotEquals} from "../../src/Instructions/SkipIfRegistersNotEquals.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SkipIfRegistersNotEquals();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x95E0))).toBeTrue();
    expect(opcode.matches(new Instruction(0x90E1))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("dont skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        di.vr.values[0x2] = 0xEE;
        opcode.execute(di, new Instruction(0x9120));
        expect(di.pc.value).toBe(0x0);
    });
    test("skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        opcode.execute(di, new Instruction(0x9160));
        expect(di.pc.value).toBe(0x2);
    });
});