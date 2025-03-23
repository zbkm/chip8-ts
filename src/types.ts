import {Stack} from "./Stack.ts";
import {Memory} from "./Memory.ts";
import {IndexRegister} from "./IndexRegister.ts";
import {VariableRegisters} from "./VariableRegisters.ts";
import {BaseDisplay} from "./Displays/BaseDisplay.ts";
import {BaseFont} from "./Fonts/BaseFont.ts";
import type {ProgramCounter} from "./ProgramCounter.ts";
import type {BaseInstruction} from "./Instructions/BaseInstruction.ts";
import type {DelayTimer} from "./Timers/DelayTimer.ts";
import type {SoundTimer} from "./Timers/SoundTimer.ts";

export type Instruction = [number, number, number, number];

export type DI = {
    stack: Stack,
    memory: Memory,
    ir: IndexRegister,
    vr: VariableRegisters,
    display: BaseDisplay,
    font: BaseFont,
    pc: ProgramCounter,
    instructions: BaseInstruction[],
    timers: {
        delay: DelayTimer,
        sound: SoundTimer
    }
}