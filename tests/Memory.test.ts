import { expect, test } from "bun:test";
import {Memory} from "../src/Memory.ts";

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
