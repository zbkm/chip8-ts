import { expect, test } from "bun:test";
import {Memory} from "../src/Memory.ts";
import {DefaultFont} from "../src/Fonts/DefaultFont.ts";

test("Memory reservation", () => {
    const memory = new Memory();
    expect(memory.get(0x1FF)).toBe(0); // 511
    expect(memory.get(0x200)).toBeNull(); // 512
});

test("Save data", () => {
    const memory = new Memory();
    expect(memory.get(0x200)).toBeNull();
    memory.save(0x200, 1);
    expect(memory.get(0x200)).toBe(1);
});

test("Save font", () => {
    const memory = new Memory();
    memory.setMultiple(memory.info.font, (new DefaultFont()).bytes());
    expect(memory.get(0x50)).toBe(0xF0);
    expect(memory.get(0x9F)).toBe(0x80);
});