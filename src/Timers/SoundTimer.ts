import type {BaseSound} from "../Sounds/BaseSound.ts";
import {BaseTimer} from "./BaseTimer.ts";

export class SoundTimer extends BaseTimer {
    constructor(protected beeper: BaseSound) {
        super();
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected onTick() {
        this.beeper.beep();
    }
}