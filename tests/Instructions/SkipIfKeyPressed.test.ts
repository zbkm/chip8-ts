import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {Instruction} from "../../src/Instruction.ts";
import {MockKeypad} from "../../src/Keypad/MockKeypad.ts";
import {SkipIfKeyPressed} from "../../src/Instructions/SkipIfKeyPressed.ts";


const di = defaultEmulatorOptions();
di.keypad = new MockKeypad();
const opcode = new SkipIfKeyPressed();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xE19E))).toBeTrue();
    expect(opcode.matches(new Instruction(0xE23E))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("key pressed", () => {
        di.vr.values[0x1] = 0x5;
        // @ts-ignore
        di.keypad.key = "5";
        opcode.execute(di, new Instruction(0xE19E));
        expect(di.pc.value).toBe(2);
    });
    test("key don't pressed", () => {
        di.vr.values[0x1] = 0x3;
        // @ts-ignore
        di.keypad.key = "A";
        opcode.execute(di, new Instruction(0xE19E));
        expect(di.pc.value).toBe(2);
    });
});