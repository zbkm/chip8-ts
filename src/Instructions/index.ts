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
import {Sum} from "./Sum.ts";
import {SubtractXY} from "./SubtractXY.ts";
import {SubtractYX} from "./SubtractYX.ts";
import {ShiftRight} from "./ShiftRight.ts";
import {ShiftLeft} from "./ShiftLeft.ts";
import {JumpWithOffset} from "./JumpWithOffset.ts";
import {Random} from "./Random.ts";
import {TimerDelaySet} from "./TimerDelaySet.ts";
import {TimerDelayGet} from "./TimerDelayGet.ts";
import {TimerSoundSet} from "./TimerSoundSet.ts";
import {AddToIndex} from "./AddToIndex.ts";
import {FontCharacter} from "./FontCharacter.ts";
import {BinaryCodedDecimalConversion} from "./BinaryCodedDecimalConversion.ts";
import {MemoryStore} from "./MemoryStore.ts";
import {MemoryLoad} from "./MemoryLoad.ts";
import {SubroutineReturn} from "./SubroutineReturn.ts";


export const getAllInstructions = (): BaseInstruction[] => [
    // 0NNN - execute machine language subroutine - skip
    new ClearScreenInstruction(), // 00E0
    new SubroutineReturn(), // 00EE
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
    new Sum(), // 8XY4
    new SubtractXY(), // 8XY5
    new ShiftRight(), // 8XY6
    new SubtractYX(), // 8XY7
    new ShiftLeft(), // 8XYE
    new SkipIfVXNotEqualsVY(), // 9XY0
    new StoreRegisterIInstruction(), // ANNN
    new JumpWithOffset(), // BNNN
    new Random(), // CXNN
    new DrawSpriteInstruction(), // DXYN
    // EX9E
    // EXA1
    new TimerDelayGet(), // FX07
    // FX0A
    new TimerDelaySet(), // FX15
    new TimerSoundSet(), // FX18
    new AddToIndex(), // FX1E
    new FontCharacter(), // FX29
    new BinaryCodedDecimalConversion(), // FX33
    new MemoryStore(), // FX55
    new MemoryLoad() // FX65
];