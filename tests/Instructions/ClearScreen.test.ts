import {describe, expect, test} from "bun:test";
import {defaultEmulatorOptions} from "../../src/utils/options.ts";
import {ClearScreen} from "../../src/Instructions/ClearScreen.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";


const di = defaultEmulatorOptions();
di.display = new NoDisplay();
di.display.clear();
const opcode = new ClearScreen();

test("Instruction match", () => {
    expect(opcode.matches([0x0, 0x0, 0xE, 0x0])).toBeTrue();
    expect(opcode.matches([0x0, 0x0, 0xE, 0xE])).toBeFalse();
});

describe("Instruction execute", () => {
    test("clear", () => {
        di.display.drawPixel(1, 1, true);
        opcode.execute(di, [0x0, 0x0, 0xE, 0x0]);
        expect(di.display.state.some(row => row.includes(true))).toBeFalse();
    });
});