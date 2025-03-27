await Bun.build({
    entrypoints: ["./app/web/script.ts"],
    target: "browser",
    format: "esm",
    outdir: "dist",
    naming: "emulator.js"
});

const file = Bun.file("./app/web/index.html");
await Bun.write("./dist/index.html", file);
