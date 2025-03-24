import { expect, test } from "bun:test";
import {Instruction} from "../src/Instruction.ts";

test("value extraction", () => {
    const memory = new Instruction(0x1f45);
    expect(memory.full).toBe(0x1f45);
    expect(memory.x).toBe(0xf);
    expect(memory.y).toBe(0x4);
    expect(memory.n).toBe(0x5);
    expect(memory.nn).toBe(0x45);
    expect(memory.nnn).toBe(0xf45);
});

