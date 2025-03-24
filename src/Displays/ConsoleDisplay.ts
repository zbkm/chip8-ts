import {BaseDisplay} from "./BaseDisplay.ts";

export class ConsoleDisplay extends BaseDisplay {
    /**
     * @inheritDoc
     */
    public render(): void {
        console.clear();
        console.log(
            Array.from({length: this.HEIGHT}, (_, col) =>
                this.state.map(row => row[col] ? "█" : ".").join("")
            ).join("\n")
        );
    }
}