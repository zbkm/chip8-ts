import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


export class BrowserKeypad extends BaseKeypad {
    protected _key: Keys | null = null;
    keyMapping: Record<string, Keys> = {
        "1": "1", "2": "2", "3": "3", "4": "C",
        "Q": "4", "W": "5", "E": "6", "R": "D",
        "A": "7", "S": "8", "D": "9", "F": "E",
        "Z": "A", "X": "0", "C": "B", "V": "F"
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
     * @param event
     */
    protected handlePress = (event: KeyboardEvent) => {
        const pressedKey = event.key.toUpperCase();
        if (this.keyMapping[pressedKey]) {
            event.preventDefault();
            this._key = this.keyMapping[pressedKey];
        }
    }

    /**
     * Handle key unpressed event from EventListener
     * @param _
     */
    protected handleUnPress = (_: KeyboardEvent) => {
        this._key = null;
    }
}