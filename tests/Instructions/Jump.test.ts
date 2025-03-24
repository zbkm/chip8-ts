import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {Jump} from "../../src/Instructions/Jump.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new Jump();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x10EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("return", () => {
        di.pc.value = 0x10;
        opcode.execute(di, new Instruction(0x11E3));
        expect(di.pc.value).toBe(0x1E3);
    });
});