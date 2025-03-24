import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {SkipIfNotEquals} from "../../src/Instructions/SkipIfNotEquals.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new SkipIfNotEquals();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x45EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        opcode.execute(di, new Instruction(0x41EE));
        expect(di.pc.value).toBe(0x0);
    });
    test("dont skip instruction", () => {
        di.pc.value = 0x0;
        opcode.execute(di, new Instruction(0x44EE));
        expect(di.pc.value).toBe(0x2);
    });
});