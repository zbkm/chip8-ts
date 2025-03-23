import {ClearScreenInstruction} from "./ClearScreenInstruction.ts";
import type {BaseInstruction} from "./BaseInstruction.ts";
import {JumpInstruction} from "./JumpInstruction.ts";
import {StoreRegisterVXInstruction} from "./StoreRegisterVXInstruction.ts";
import {AddValueRegisterVXInstruction} from "./AddValueRegisterVXInstruction.ts";
import {StoreRegisterIInstruction} from "./StoreRegisterIInstruction.ts";
import {DrawSpriteInstruction} from "./DrawSpriteInstruction.ts";


export const getAllInstructions = (): BaseInstruction[] => [
    new ClearScreenInstruction(), // 00E0
    new JumpInstruction(), // 1NNN
    new StoreRegisterVXInstruction(), // 6XNN
    new AddValueRegisterVXInstruction(), // 7XNN
    new StoreRegisterIInstruction(), // ANNN
    new DrawSpriteInstruction(), // DXYN
];