import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {BinaryAnd} from "../../src/Instructions/BinaryAnd.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new BinaryAnd();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E2))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("and", () => {
        di.vr.values[0x4] = 0x5;
        di.vr.values[0x5] = 0x3;
        opcode.execute(di, new Instruction(0x8452));
        expect(di.vr.values[0x4]).toBe(0x1);
        expect(di.vr.values[0x5]).toBe(0x3);
    });
});