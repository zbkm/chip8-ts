import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {AddToRegister} from "../../src/Instructions/AddToRegister.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new AddToRegister();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x75EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("add value to register", () => {
        opcode.execute(di, new Instruction(0x7112));
        expect(di.vr.values[1]).toBe(0x12);
        opcode.execute(di, new Instruction(0x71FF));
        expect(di.vr.values[1]).toBe(0x11);
    });
});