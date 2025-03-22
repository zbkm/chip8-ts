import { expect, test } from "bun:test";
import {Stack} from "../src/Stack.ts";

test("Push and pop values", () => {
    const stack = new Stack();
    stack.push(0x12);
    stack.push(0xF0);
    expect(stack.pop()).toBe(0xF0);
});
