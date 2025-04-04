import {Emulator} from "../../src/Emulator.ts";
import {describe, expect, test} from "bun:test";
import {parseDisplay} from "../utils/parseDisplay.ts";
import {NoDisplay} from "../../src/Displays/NoDisplay.ts";

const file = await Bun.file("lib/chip8-test-suite/bin/2-ibm-logo.ch8").bytes();

const resultScreenState = `
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
............████████.█████████...█████.........█████..█.█.......
......................................................█.█.......
............████████.███████████.██████.......██████...█........
................................................................
..............████.....███...███...█████.....█████....█.█.......
......................................................███.......
..............████.....███████.....███████.███████......█.......
........................................................█.......
..............████.....███████.....███.███████.███..............
.......................................................█........
..............████.....███...███...███..█████..███..............
......................................................███.......
............████████.███████████.█████...███...█████....█.......
......................................................██........
............████████.█████████...█████....█....█████..███.......
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
`;

describe.only("ROM execute", () => {
    test.todo("ibm logo", async () => {
        const display = new NoDisplay();
        const emulator = new Emulator(Array.from(file), {
            display,
        });

        for (let i = 0; 20 > i; i++) {
            await emulator.step();
        }
        expect(display.state).toEqual(parseDisplay(resultScreenState));
    });
});


