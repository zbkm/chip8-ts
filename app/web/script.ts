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

startBtn.addEventListener("click", startEmulator);
stopBtn.addEventListener("click", stopEmulator);


let em: Emulator | undefined;

async function startEmulator() {
    const file = romFileInput.files![0];
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#00FF00";

    em = new Emulator({
        display: new CanvasDisplay(ctx),
        keypad: new BrowserKeypad(),
        sound: new SoundTimer(new BrowserSound())
    });
    em.run([...new Uint8Array(await file.arrayBuffer())]);
}

async function stopEmulator() {
    if (em) {
        em.stop();
    }
}

loadBtn.addEventListener("click", () => {romFileInput.click();});

romFileInput.addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files![0];
    loadBtn.textContent = file ? `Loaded: ${file.name}` : `Load ROM`;
});