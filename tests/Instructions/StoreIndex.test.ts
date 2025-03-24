import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {StoreIndex} from "../../src/Instructions/StoreIndex.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new StoreIndex();

test("Instruction match", () => {
    expect(opcode.matches([0xA, 0x5, 0xE, 0xE])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("store i register", () => {
        opcode.execute(di, [0xA, 0x1, 0xE, 0xE]);
        expect(di.ir.value).toBe(0x1EE);
    });
});