import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {Random} from "../../src/Instructions/Random.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new Random();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xC5E2))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("random", () => {
        opcode.execute(di, new Instruction(0xC452));
        // I don't know how to test this -_-
    });
});