import {BaseDisplay} from "./BaseDisplay.ts";

export class ConsoleDisplay extends BaseDisplay {
    /**
     * @inheritDoc
     */
    public render(): void {
        console.clear();
        console.log(
            Object.values(
                Object.values(this.state).map(e => e.join(""))
            ).join("\n").replaceAll("false", ".").replaceAll("true", "+")
        );
    }
}