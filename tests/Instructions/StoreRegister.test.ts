import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {StoreRegister} from "../../src/Instructions/StoreRegister.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new StoreRegister();

test("Instruction match", () => {
    expect(opcode.matches([0x6, 0x5, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("store v register", () => {
        opcode.execute(di, [0x0, 0x1, 0xE, 0xE]);
        expect(di.vr.values[1]).toBe(0xEE);
        opcode.execute(di, [0x0, 0x3, 0x1, 0x5]);
        expect(di.vr.values[3]).toBe(0x15);
    });
});