import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {Sum} from "../../src/Instructions/Sum.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new Sum();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0x85E4))).toBeTrue();
    expect(opcode.matches(new Instruction(0x85E0))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("add not occur", () => {
        di.vr.set(0x4, 0x5);
        di.vr.set(0x5, 0x3);
        opcode.execute(di, new Instruction(0x8454));
        expect(di.vr.get(0x4)).toBe(0x8);
        expect(di.vr.get(0x5)).toBe(0x3);
        expect(di.vr.get(0xF)).toBe(0x0);
    });
    test("add occur", () => {
        di.vr.set(0x4, 0x12);
        di.vr.set(0x5, 0xFF);
        opcode.execute(di, new Instruction(0x8454));
        expect(di.vr.get(0x4)).toBe(0x11);
        expect(di.vr.get(0x5)).toBe(0xFF);
        expect(di.vr.get(0xF)).toBe(0x1);
    });
});