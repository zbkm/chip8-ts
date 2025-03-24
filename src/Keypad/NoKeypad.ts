import {BaseKeypad} from "./BaseKeypad.ts";
import {type Keys} from "../types.ts";


export class NoKeypad extends BaseKeypad {
    /**
     * @inheritDoc
     */
    get key(): Keys | null {
        return null;
    }
}