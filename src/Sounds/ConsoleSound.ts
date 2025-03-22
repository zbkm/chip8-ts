import {BaseSound} from "./BaseSound.ts";

export class ConsoleSound extends BaseSound {
    /**
     * @inheritDoc
     */
    public beep(): void {
        process.stdout.write("\x07"); // bell character
    }
}