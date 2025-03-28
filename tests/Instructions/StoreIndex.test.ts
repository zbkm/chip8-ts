import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {StoreIndex} from "../../src/Instructions/StoreIndex.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new StoreIndex();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xA5EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("store i register", () => {
        opcode.execute(di, new Instruction(0xA1EE));
        expect(di.ir).toBe(0x1EE);
    });
});