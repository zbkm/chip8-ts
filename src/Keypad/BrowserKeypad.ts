import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


export class BrowserKeypad extends BaseKeypad {
    protected _key: Keys | null = null;
    keyMapping: Record<string, Keys> = {
        "1": 0x1, "2": 0x2, "3": 0x3, "4": 0xC,
        "Q": 0x4, "W": 0x5, "E": 0x6, "R": 0xD,
        "A": 0x7, "S": 0x8, "D": 0x9, "F": 0xE,
        "Z": 0xA, "X": 0x0, "C": 0xB, "V": 0xF
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
        const pressedKey = event.key.toUpperCase();

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
        const unPressedKey = event.key.toUpperCase();
        if (unPressedKey in this.keyMapping) {
            this._key = null;
        }
    }
}