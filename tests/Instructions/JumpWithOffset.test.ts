import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {JumpWithOffset} from "../../src/Instructions/JumpWithOffset.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new JumpWithOffset();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xB0EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("jump with 0 offset", () => {
        di.pc = 0x10;
        opcode.execute(di, new Instruction(0xB1E3));
        expect(di.pc).toBe(0x1E3);
    });
    test("jump with offset", () => {
        di.pc = 0x10;
        di.vr.values[0] = 0x10;
        opcode.execute(di, new Instruction(0xB1E3));
        expect(di.pc).toBe(0x1F3);
    });
});