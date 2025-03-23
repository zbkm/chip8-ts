import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {Random} from "../../src/Instructions/Random.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new Random();

test("Instruction match", () => {
    expect(opcode.matches([0xC, 0x5, 0xE, 0x2])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("random", () => {
        opcode.execute(di, [0x8, 0x4, 0x5, 0x2]);
        // I don't know how to test this -_-
    });
});