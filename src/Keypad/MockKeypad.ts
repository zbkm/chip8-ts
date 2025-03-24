import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


/**
 * Mock keypad for testing
 */
export class MockKeypad extends BaseKeypad {
    protected _key: Keys|null = null;
    /**
     * @inheritDoc
     */
    get key(): Keys | null {
        return this._key;
    }

    set key(value: Keys|null) {
        this._key = value;
    }
}