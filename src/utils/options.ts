import type {DI} from "../types.ts";
import {DefaultFont} from "../Fonts/DefaultFont.ts";
import {Memory} from "../Memory.ts";
import {Stack} from "../Stack.ts";
import {VariableRegisters} from "../VariableRegisters.ts";
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
        ir: 0,
        memory: new Memory(),
        stack: new Stack(),
        vr: new VariableRegisters(),
        pc: 0,
        instructions: getAllInstructions(),
        delay: new DelayTimer(),
        sound: new SoundTimer(new NoSound()),
        keypad: new NoKeypad(),
        interval: 1
    };
};