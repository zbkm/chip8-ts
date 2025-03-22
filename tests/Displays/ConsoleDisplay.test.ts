import {test} from "bun:test";
import {ConsoleDisplay} from "../../src/Displays/ConsoleDisplay.ts";

test.skip("Render", () => {
    // todo implement test for console display
    const display = new ConsoleDisplay();
    display.clear();
    display.drawSprite(10, 5, [0xF0, 0x90, 0x90, 0x90, 0xF0]); // 0
    display.drawSprite(20, 5, [0xF0, 0x10, 0xF0, 0x80, 0xF0]); // 2
    display.drawSprite(30, 5, [0xF0, 0x80, 0xF0, 0x90, 0xF0]); // 6
    display.drawSprite(63, 31, [0xFF]);
    display.drawSprite(0, 31, [0xFF]);
    display.drawSprite(0, 0, [0xFF]);
    display.drawSprite(63, 0, [0xFF]);
    display.drawSprite(25, 25, [0xFF]);
    display.render();
});