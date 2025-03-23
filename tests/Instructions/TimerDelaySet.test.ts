import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";
import {TimerDelaySet} from "../../src/Instructions/TimerDelaySet.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
const opcode = new TimerDelaySet();

test("Instruction match", () => {
    expect(opcode.matches([0xF, 0x0, 0x1, 0x5])).toBeTrue();
    expect(opcode.matches([0xF, 0x0, 0x1, 0x4])).toBeFalse();
    expect(opcode.matches([0x3, 0x0, 0xE, 0x0])).toBeFalse();
});

describe("Instruction execute", () => {
    test("set timer delay", async () => {
        opcode.execute(di, [0xF, 0x1, 0x0, 0x7]);
        expect(di.timers.delay.timer).toBe(0x0);
        di.vr.values[1] = 0xFF;
        opcode.execute(di, [0xF, 0x1, 0x0, 0x7]);
        expect(di.timers.delay.timer).toBe(0xFF);
    });
});