import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {FontCharacter} from "../../src/Instructions/FontCharacter.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new FontCharacter();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF529))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF0E9))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("get font character", () => {
        di.vr.values[1] = 0x5;
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.ir).toBe(0x69);
        di.vr.values[1] = 0xF;
        opcode.execute(di, new Instruction(0xF11E));
        expect(di.ir).toBe(0x9b);
    });
});