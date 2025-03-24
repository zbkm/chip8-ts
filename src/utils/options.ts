import type {DI} from "../types.ts";
import {DefaultFont} from "../Fonts/DefaultFont.ts";
import {IndexRegister} from "../IndexRegister.ts";
import {Memory} from "../Memory.ts";
import {Stack} from "../Stack.ts";
import {VariableRegisters} from "../VariableRegisters.ts";
import {ProgramCounter} from "../ProgramCounter.ts";
import {getAllInstructions} from "../Instructions";
import {DelayTimer} from "../Timers/DelayTimer.ts";
import {SoundTimer} from "../Timers/SoundTimer.ts";
import {NoSound} from "../Sounds/NoSound.ts";
import {NoKeypad} from "../Keypad/NoKeypad.ts";
import {NoDisplay} from "../Displays/NoDisplay.ts";

export const defaultEmulatorOptions = (): DI => {
    return {
        display: new NoDisplay(),
        font: new DefaultFont(),
        ir: new IndexRegister(),
        memory: new Memory(),
        stack: new Stack(),
        vr: new VariableRegisters(),
        pc: new ProgramCounter(),
        instructions: getAllInstructions(),
        timers: {
            delay: new DelayTimer(),
            sound: new SoundTimer(new NoSound())
        },
        keypad: new NoKeypad()
    };
};