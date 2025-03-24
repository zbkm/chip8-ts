import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {StoreRegister} from "../../src/Instructions/StoreRegister.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new StoreRegister();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x65EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("store v register", () => {
        opcode.execute(di, new Instruction(0x61EE));
        expect(di.vr.values[1]).toBe(0xEE);
        opcode.execute(di, new Instruction(0x6315));
        expect(di.vr.values[3]).toBe(0x15);
    });
});