import { expect, test } from "bun:test";
import {DelayTimer} from "../../src/Timers/DelayTimer.ts";

test("Test timer", async () => {
    const timer = new DelayTimer();
    expect(timer.timer).toBe(0);
    timer.timer = 15
    await new Promise(r => setTimeout(r, 250)); // 60 times per second -> 15 times every quarter of a second
    expect(timer.timer).toBeWithin(0, 10);
});
