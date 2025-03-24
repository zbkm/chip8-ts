import {BaseSound} from "./BaseSound.ts";

export class NoSound extends BaseSound {
    /**
     * @inheritDoc
     */
    public beep(): void {
    }
}