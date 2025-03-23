import {BaseDisplay} from "./BaseDisplay.ts";

/**
 * Mock display for tests
 */
export class NoDisplay extends BaseDisplay {
    /**
     * @inheritDoc
     */
    public render(): void {}
}