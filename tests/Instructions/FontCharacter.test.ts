import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {FontCharacter} from "../../src/Instructions/FontCharacter.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new FontCharacter();

test("Instruction match", () => {
    expect(opcode.matches([0xF, 0x5, 0x2, 0x9])).toBeTrue();
    expect(opcode.matches([0xF, 0x0, 0xE, 0x9])).toBeFalse();
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("get font character", () => {
        di.vr.values[1] = 0x5;
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.ir.value).toBe(0x69);
        di.vr.values[1] = 0xF;
        opcode.execute(di, [0xF, 0x1, 0x1, 0xE]);
        expect(di.ir.value).toBe(0x9b);
    });
});