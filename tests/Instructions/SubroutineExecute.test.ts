import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {SubroutineExecute} from "../../src/Instructions/SubroutineExecute.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new SubroutineExecute();

test("Instruction match", () => {
    expect(opcode.matches([0x2, 0x0, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x3, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("return", () => {
        di.pc.value = 0x10;
        opcode.execute(di, [0x0, 0x1, 0xE, 0x3]);
        expect(di.pc.value).toBe(0x1E3);
        expect(di.stack.pop()).toBe(0x10);
    });
});