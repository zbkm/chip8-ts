import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {StoreIndex} from "../../src/Instructions/StoreIndex.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new StoreIndex();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xA5EE))).toBeTrue();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("store i register", () => {
        opcode.execute(di, new Instruction(0xA1EE));
        expect(di.ir.value).toBe(0x1EE);
    });
});