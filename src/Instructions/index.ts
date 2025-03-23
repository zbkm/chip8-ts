import {ClearScreenInstruction} from "./ClearScreenInstruction.ts";
import type {BaseInstruction} from "./BaseInstruction.ts";
import {JumpInstruction} from "./JumpInstruction.ts";
import {StoreRegisterVXInstruction} from "./StoreRegisterVXInstruction.ts";
import {AddValueRegisterVXInstruction} from "./AddValueRegisterVXInstruction.ts";
import {StoreRegisterIInstruction} from "./StoreRegisterIInstruction.ts";
import {DrawSpriteInstruction} from "./DrawSpriteInstruction.ts";
import {SubroutineExecute} from "./SubroutineExecute.ts";
import {SkipIfVXEqualsNN} from "./SkipIfVXEqualsNN.ts";
import {SkipIfVXNotEqualsNN} from "./SkipIfVXNotEqualsNN.ts";
import {SkipIfVXEqualsVY} from "./SkipIfVXEqualsVY.ts";
import {SkipIfVXNotEqualsVY} from "./SkipIfVXNotEqualsVY.ts";
import {StoreVYinVX} from "./StoreVYinVX.ts";
import {BinaryOr} from "./BinaryOr.ts";
import {BinaryAnd} from "./BinaryAnd.ts";
import {BinaryXor} from "./BinaryXor.ts";


export const getAllInstructions = (): BaseInstruction[] => [
    new ClearScreenInstruction(), // 00E0
    new JumpInstruction(), // 1NNN
    new SubroutineExecute(), // 2NNN
    new SkipIfVXEqualsNN(), // 3XNN
    new SkipIfVXNotEqualsNN(), // 4XNN
    new SkipIfVXEqualsVY(), // 5XY0
    new StoreRegisterVXInstruction(), // 6XNN
    new AddValueRegisterVXInstruction(), // 7XNN
    new StoreVYinVX(), // 8XY0
    new BinaryOr(), // 8XY1
    new BinaryAnd(), // 8XY2
    new BinaryXor(), // 8XY3

    new SkipIfVXNotEqualsVY(), // 9XY0

    new StoreRegisterIInstruction(), // ANNN
    new DrawSpriteInstruction(), // DXYN
];