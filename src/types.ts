import {Stack} from "./Stack.ts";
import {Memory} from "./Memory.ts";
import {IndexRegister} from "./IndexRegister.ts";
import {VariableRegisters} from "./VariableRegisters.ts";
import {BaseDisplay} from "./Displays/BaseDisplay.ts";
import {BaseFont} from "./Fonts/BaseFont.ts";
import type {BaseInstruction} from "./Instructions/BaseInstruction.ts";
import type {DelayTimer} from "./Timers/DelayTimer.ts";
import type {SoundTimer} from "./Timers/SoundTimer.ts";
import type {BaseKeypad} from "./Keypad/BaseKeypad.ts";

type ProgramCounter = number;

export type DI = {
    stack: Stack,
    memory: Memory,
    ir: IndexRegister,
    vr: VariableRegisters,
    display: BaseDisplay,
    font: BaseFont,
    pc: ProgramCounter,
    instructions: BaseInstruction[],
    delay: DelayTimer,
    sound: SoundTimer
    keypad: BaseKeypad,
    interval: number
}

export type Keys = 0x1 | 0x2 | 0x3 | 0xC |
    0x4 | 0x5 | 0x6 | 0xD |
    0x7 | 0x8 | 0x9 | 0xE |
    0xA | 0x0 | 0xB | 0xF

export type MemoryInfo = {
    large: number,
    reserved: number,
    font: number
}
