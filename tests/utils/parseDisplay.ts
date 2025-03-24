/**
 * Convert the display screenshot string to a byte array like BaseDisplay state
 * @param display {string} Display state, where enabled pixels █
 * @returns {boolean[][]} boolean array like BaseDisplay state
 */
export const parseDisplay = (display: string): boolean[][] => {
    const parsedDisplay = display.trim().split("\n").map(row => row.split("").map(c => c === "█"));
    return parsedDisplay[0].map((_, colIndex) => parsedDisplay.map(row => row[colIndex])); // change x <-> y axes
}