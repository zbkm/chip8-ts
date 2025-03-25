const emulator = await (await Bun.build({
    entrypoints: ["./app/web/script.ts"],
    target: "browser",
    format: "esm"
})).outputs[0].text();


const server = Bun.serve({
    port: 3000,
    routes: {
        "/": new Response(await Bun.file("app/web/index.html").text()),
        "/emulator.js": new Response(emulator, {headers: {"Content-Type": "application/javascript"}})
    },
});

console.log(`Listening on http://localhost:${server.port}`);