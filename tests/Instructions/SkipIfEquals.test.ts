import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {SkipIfEquals} from "../../src/Instructions/SkipIfEquals.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new SkipIfEquals();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x35EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("skip instruction", () => {
        di.pc.value = 0x0;
        di.vr.values[0x1] = 0xEE;
        opcode.execute(di, new Instruction(0x31EE));
        expect(di.pc.value).toBe(0x2);
    });
    test("dont skip instruction", () => {
        di.pc.value = 0x0;
        opcode.execute(di, new Instruction(0x34EE));
        expect(di.pc.value).toBe(0x0);
    });
});