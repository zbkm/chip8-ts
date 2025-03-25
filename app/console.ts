import {Emulator} from "../src/Emulator.ts";
import {ConsoleKeypad} from "../src/Keypad/ConsoleKeypad.ts";
import {ConsoleDisplay} from "../src/Displays/ConsoleDisplay.ts";

if (Bun.argv.length == 2 || !await Bun.file(Bun.argv[2]).exists()) {
    console.error("ROM not found");
    process.exit();
}

const file = await Bun.file(Bun.argv[2]).bytes();
const emulator = new Emulator({
    display: new ConsoleDisplay(),
    keypad: new ConsoleKeypad()
});

emulator.run(Array.from(file));
