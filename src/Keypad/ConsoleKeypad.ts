import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


export class ConsoleKeypad extends BaseKeypad {
    _key: Keys | null = null;

    keyMapping: Record<string, Keys> = {
        "1": "1", "2": "2", "3": "3", "4": "C",
        "Q": "4", "W": "5", "E": "6", "R": "D",
        "A": "7", "S": "8", "D": "9", "F": "E",
        "Z": "A", "X": "0", "C": "B", "V": "F"
    };

    constructor() {
        super();
        process.stdin.setRawMode(true);
        process.stdin.on("data", this.handlePress);
    }

    /**
     * @inheritDoc
     */
    get key(): Keys | null {
        return this._key;
    }

    protected handlePress = (key: Buffer<ArrayBufferLike>): void => {
        const pressedKey = key.toString().toUpperCase();

        if (this.keyMapping[pressedKey]) {
            this._key = this.keyMapping[pressedKey];
            setTimeout(this.resetPress, 200);
        }

        // exit ctrl + c
        if (pressedKey === "\u0003") {
            process.exit();
        }
    }

    protected resetPress = (): void => {
        this._key = null;
    }
}