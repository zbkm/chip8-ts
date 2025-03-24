import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {TimerDelayGet} from "../../src/Instructions/TimerDelayGet.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new TimerDelayGet();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF007))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF014))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("get timer delay", async () => {
        opcode.execute(di, new Instruction(0xF107));
        expect(di.vr.values[1]).toBe(0x0);
        di.timers.delay.timer = 0xFF;
        opcode.execute(di, new Instruction(0xF107));
        expect(di.vr.values[1]).toBe(0xFF);
    });
});