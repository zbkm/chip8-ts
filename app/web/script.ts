import {Emulator} from "../../src/Emulator.ts";
import {CanvasDisplay} from "../../src/Displays/CanvasDisplay.ts";
import {BrowserKeypad} from "../../src/Keypad/BrowserKeypad.ts";
import {BrowserSound} from "../../src/Sounds/BrowserSound.ts";
import {SoundTimer} from "../../src/Timers/SoundTimer.ts";

const canvas = document.getElementById("chip8-canvas") as HTMLCanvasElement;
const loadBtn = document.getElementById("load-btn")!;
const startBtn = document.getElementById("start")!;
const stopBtn = document.getElementById("stop")!;
const romFileInput = document.getElementById("rom") as HTMLInputElement;
let em: Emulator | undefined;

loadBtn.addEventListener("click", () => romFileInput.click());

romFileInput.addEventListener("change", async (event) => {
    const file = (event.target as HTMLInputElement).files![0];
    loadBtn.textContent = file ? `Loaded: ${file.name}` : `Load ROM`;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#00FF00";

    em = new Emulator([...new Uint8Array(await file.arrayBuffer())], {
        display: new CanvasDisplay(ctx),
        keypad: new BrowserKeypad(),
        sound: new SoundTimer(new BrowserSound())
    });
});

startBtn.addEventListener("click", () => em?.run());
stopBtn.addEventListener("click", () => em?.stop());