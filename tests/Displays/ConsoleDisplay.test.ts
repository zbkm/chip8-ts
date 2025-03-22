import {test} from "bun:test";
import {ConsoleDisplay} from "../../src/Displays/ConsoleDisplay.ts";

test.skip("Render", () => {
    // todo implement test for console display
    const display = new ConsoleDisplay();
    display.clear();
    display.drawSprite(10, 5, [0xE0, 0x80, 0xE0, 0x20, 0xC0]);
    display.render();
});