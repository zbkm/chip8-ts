import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {TimerSoundSet} from "../../src/Instructions/TimerSoundSet.ts";
import {Instruction} from "../../src/Instruction.ts";


const di = defaultEmulatorOptions();
const opcode = new TimerSoundSet();

test("Instruction match", () => {
    expect(opcode.matches(new Instruction(0xF018))).toBeTrue();
    expect(opcode.matches(new Instruction(0xF014))).toBeFalse();
    expect(opcode.matches(new Instruction(0x0000))).toBeFalse();
});

describe("Instruction execute", () => {
    test("set timer delay", async () => {
        opcode.execute(di, new Instruction(0xF118));
        expect(di.timers.sound.timer).toBe(0x0);
        di.vr.values[1] = 0xFF;
        opcode.execute(di, new Instruction(0xF118));
        expect(di.timers.sound.timer).toBe(0xFF);
    });
});