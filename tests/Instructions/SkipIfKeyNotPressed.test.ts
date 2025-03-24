import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {Instruction} from "../../src/Instruction.ts";
import {SkipIfKeyNotPressed} from "../../src/Instructions/SkipIfKeyNotPressed.ts";
import {MockKeypad} from "../../src/Keypad/MockKeypad.ts";


const di = defaultEmulatorOptions();
di.keypad = new MockKeypad();
const opcode = new SkipIfKeyNotPressed();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xE1A1))).toBeTrue();
    expect(opcode.matches(new Instruction(0xE1B1))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("key pressed", () => {
        di.vr.values[0x1] = 0x5;
        // @ts-ignore
        di.keypad.key = "5";
        opcode.execute(di, new Instruction(0xE1A1));
        expect(di.pc.value).toBe(0);
    });
    test("key don't pressed", () => {
        di.vr.values[0x1] = 0x3;
        // @ts-ignore
        di.keypad.key = "A";
        opcode.execute(di, new Instruction(0xE1A1));
        expect(di.pc.value).toBe(2);
    });
});