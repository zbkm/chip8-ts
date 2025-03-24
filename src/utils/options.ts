import type {DI} from "../types.ts";
import {ConsoleDisplay} from "../Displays/ConsoleDisplay.ts";
import {DefaultFont} from "../Fonts/DefaultFont.ts";
import {IndexRegister} from "../IndexRegister.ts";
import {Memory} from "../Memory.ts";
import {Stack} from "../Stack.ts";
import {VariableRegisters} from "../VariableRegisters.ts";
import {ProgramCounter} from "../ProgramCounter.ts";
import {getAllInstructions} from "../Instructions";
import {DelayTimer} from "../Timers/DelayTimer.ts";
import {SoundTimer} from "../Timers/SoundTimer.ts";
import {MockSound} from "../Sounds/MockSound.ts";
import {ConsoleKeypad} from "../Keypad/ConsoleKeypad.ts";
import {NoKeypad} from "../Keypad/NoKeypad.ts";

export const defaultEmulatorOptions = (): DI => {
    return {
        display: new ConsoleDisplay(),
        font: new DefaultFont(),
        ir: new IndexRegister(),
        memory: new Memory(),
        stack: new Stack(),
        vr: new VariableRegisters(),
        pc: new ProgramCounter(),
        instructions: getAllInstructions(),
        timers: {
            delay: new DelayTimer(),
            sound: new SoundTimer(new MockSound())
        },
        keypad: new NoKeypad()
    };
};