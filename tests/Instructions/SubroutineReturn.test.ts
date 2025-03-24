import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SubroutineReturn} from "../../src/Instructions/SubroutineReturn.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SubroutineReturn();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x00EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("return", () => {
        di.stack.push(0x250);
        opcode.execute(di, new Instruction(0x00EE));
        expect(di.pc.value).toBe(0x250);
    });
});