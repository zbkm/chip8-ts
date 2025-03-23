import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SubroutineReturn} from "../../src/Instructions/SubroutineReturn.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SubroutineReturn();

test("Instruction match", () => {
    expect(opcode.matches([0x0, 0x0, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("return", () => {
        di.stack.push(0x250);
        opcode.execute(di, [0x0, 0x0, 0xE, 0xE]);
        expect(di.pc.value).toBe(0x250);
    });
});