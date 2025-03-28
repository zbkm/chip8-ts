import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {Instruction} from "../../src/Instruction.ts";
import {MockKeypad} from "../../src/Keypad/MockKeypad.ts";
import {WaitKey} from "../../src/Instructions/WaitKey.ts";


const di = defaultEmulatorOptions();
di.keypad = new MockKeypad();
const opcode = new WaitKey();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF10A))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF11A))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("key pressed", () => {
        di.vr.values[0x1] = 0x5;
        // @ts-ignore
        di.keypad.key = 0x5;
        opcode.execute(di, new Instruction(0xF10A));
        expect(di.pc).toBe(0);
    });
    test("key don't pressed", () => {
        di.pc = 2;
        di.vr.values[0x1] = 0x3;
        // @ts-ignore
        di.keypad.key = 0xA;
        opcode.execute(di, new Instruction(0xF10A));
        expect(di.pc).toBe(0);
    });
});