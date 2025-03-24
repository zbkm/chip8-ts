import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {CopyRegister} from "../../src/Instructions/CopyRegister.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new CopyRegister();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E0))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E1))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("store vy in vx", () => {
        di.vr.values[0x4] = 0xE;
        di.vr.values[0x5] = 0xF;
        opcode.execute(di, new Instruction(0x8450));
        expect(di.vr.values[0x4]).toBe(0xF);
        expect(di.vr.values[0x5]).toBe(0xF);
    });
});