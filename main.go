package main

import (
	"strings"
	"syscall/js"
)

func main() {
	doc := js.Global().Get("document")

	h1 := doc.Call("createElement", "h1")
	h1.Set("innerText", "Hello, world!")

	body := doc.Call("querySelector", "body")
	body.Call("appendChild", h1)

	h1.Call("addEventListener", "click", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		// OnClick execute:
		go FuncOnClick()
		/////////////////
		return nil
	}), map[string]interface{}{"passive": true})

	select {} // Prevent main from exit. ;)
}

func FuncOnClick() {
	const amount = 10_000

	sb := strings.Builder{}
	sb.Grow(amount + 1)

	oomStart()

	for i := 0; i < amount; i++ {
		sb.WriteByte('A')
		oomTest(sb.String())
	}

	oomEnd()
}

// Functions declared as imports, see main_js.js.
func oomStart()
func oomTest(s string)
func oomEnd()
