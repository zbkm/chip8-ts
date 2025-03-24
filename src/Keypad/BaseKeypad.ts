import type {Keys} from "../types.ts";


export abstract class BaseKeypad {
    /**
     * Get current pressed key
     * @returns {Keys|null} key
     */
    abstract get key(): Keys | null;
}