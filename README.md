# chip8-ts

A TypeScript implementation of the **CHIP8 interpreter**.

It has an implementation of all canonical CHIP-8 instructions.
Full support for keyboard input, sound.
Can run in both browser and console.


### Run
To run in browser::
```bash
bun run web
```

To run in console::
```bash
bun run console path/to/rom.ch8
```

### Tests
```bash
bun run test
```
To run the ROM tests will need test ROMs, they need to be installed as a git submodule:
```bash
git submodule init 
git submodule update
bun run rom-test
```
