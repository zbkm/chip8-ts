import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


export class ConsoleKeypad extends BaseKeypad {
    keyMapping: Record<string, Keys> = {
        "1": 0x1, "2": 0x2, "3": 0x3, "4": 0xC,
        "Q": 0x4, "W": 0x5, "E": 0x6, "R": 0xD,
        "A": 0x7, "S": 0x8, "D": 0x9, "F": 0xE,
        "Z": 0xA, "X": 0x0, "C": 0xB, "V": 0xF
    };

    constructor() {
        super();
        process.stdin.setRawMode(true);
        process.stdin.on("data", this.handlePress);
    }

    _key: Keys | null = null;

    /**
     * @inheritDoc
     */
    get key(): Keys | null {
        return this._key;
    }

    protected handlePress = (key: Buffer<ArrayBufferLike>): void => {
        const pressedKey = key.toString().toUpperCase();

        if (pressedKey in this.keyMapping) {
            this._key = this.keyMapping[pressedKey];
            setTimeout(this.resetPress, 200);
        }

        // exit ctrl + c
        if (pressedKey === "\u0003") {
            process.exit();
        }
    };

    protected resetPress = (): void => {
        this._key = null;
    };
}