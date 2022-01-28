(() => {
    let len = 0;
    let calls = 0;
    let start = 0;

    window.oomStart = function () {
        start = Date.now();
    }
    window.oomTest = function (k) {
        calls += 1;
        len += k.length;
        if (window.removeConsole === true) {
            // Set "window.removeConsole = true" to skip console.log.
           return
        }
        console.log(calls, k.length, k === "A".repeat(k.length), len)
    }
    window.oomEnd = function () {
        console.log("duration", (Date.now() - start) + "ms");
        console.log("finish", len, calls);
        len = calls = start = 0;
    }


    // GO IMPORT/ASSEMBLY:

    let _UTF8Decoder = new TextDecoder();

    Object.assign(go.importObject.go, {
        // func oomStart()
        "main.oomStart": (sp) => {
            window.oomStart()
        },
        // func oomEnd()
        "main.oomEnd": (sp) => {
            window.oomEnd()
        },
        // func oomTest(s string)
        "main.oomTest": (sp) => {
            const _slicePointer = go.mem.getUint32(sp + 8, true) + go.mem.getInt32(sp + 8 + 4, true) * 4294967296;
            const _sliceLength = go.mem.getUint32(sp + 8 + 8, true) + go.mem.getInt32(sp + 8 + 8 + 4, true) * 4294967296;

            window.oomTest(
                _UTF8Decoder.decode(new Uint8Array(go._inst.exports.mem.buffer, _slicePointer, _sliceLength)),
            )
        },
    });
})();