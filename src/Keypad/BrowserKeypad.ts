import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


export class BrowserKeypad extends BaseKeypad {
    protected _key: Keys | null = null;
    keyMapping: Record<string, Keys> = {
        "Digit1": 0x1, "Digit2": 0x2, "Digit3": 0x3, "Digit4": 0xC,
        "KeyQ": 0x4, "KeyW": 0x5, "KeyE": 0x6, "KeyR": 0xD,
        "KeyA": 0x7, "KeyS": 0x8, "KeyD": 0x9, "KeyF": 0xE,
        "KeyZ": 0xA, "KeyX": 0x0, "KeyC": 0xB, "KeyV": 0xF
    };

    constructor() {
        super();

        window.addEventListener('keydown', this.handlePress);
        window.addEventListener('keyup', this.handleUnPress);
    }
    /**
     * @inheritDoc
     */
    get key(): Keys | null {
        return this._key;
    }

    /**
     * Handle key press event from EventListener
     * @param event {KeyboardEvent}
     */
    protected handlePress = (event: KeyboardEvent) => {
        const pressedKey = event.code;
        if (pressedKey in this.keyMapping) {
            event.preventDefault();
            this._key = this.keyMapping[pressedKey];
        }
    }

    /**
     * Handle key unpressed event from EventListener
     * @param event {KeyboardEvent}
     */
    protected handleUnPress = (event: KeyboardEvent) => {
        const unPressedKey = event.code;
        if (unPressedKey in this.keyMapping) {
            this._key = null;
        }
    }
}