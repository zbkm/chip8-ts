import { expect, test } from "bun:test";
import {Memory} from "../src/Memory.ts";
import {DefaultFont} from "../src/Fonts/DefaultFont.ts";

test("Save data", () => {
    const memory = new Memory();
    expect(memory.get(0x200)).toBe(0);
    memory.save(0x200, 1);
    expect(memory.get(0x200)).toBe(1);
});

test("Save font", () => {
    const memory = new Memory();
    memory.setMultiple(memory.info.font, (new DefaultFont()).bytes());
    expect(memory.get(0x50)).toBe(0xF0);
    expect(memory.get(0x9F)).toBe(0x80);
});