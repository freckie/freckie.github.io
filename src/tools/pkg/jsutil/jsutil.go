package jsutil

import (
	"syscall/js"
)

// Uint8ArrayToBytes converts a JavaScript Uint8Array to Go []byte
func Uint8ArrayToBytes(arr js.Value) []byte {
	length := arr.Get("length").Int()
	bytes := make([]byte, length)
	js.CopyBytesToGo(bytes, arr)
	return bytes
}

// BytesToUint8Array converts Go []byte to JavaScript Uint8Array
func BytesToUint8Array(bytes []byte) js.Value {
	arr := js.Global().Get("Uint8Array").New(len(bytes))
	js.CopyBytesToJS(arr, bytes)
	return arr
}

// WrapAsyncFunc wraps a Go function as a Promise-returning JS function
func WrapAsyncFunc(fn func([]byte, js.Value) ([]byte, error)) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) < 1 {
			return createRejectedPromise("missing input argument")
		}

		inputArr := args[0]
		var options js.Value
		if len(args) > 1 {
			options = args[1]
		} else {
			options = js.Undefined()
		}

		// Copy input data before returning
		inputBytes := Uint8ArrayToBytes(inputArr)

		handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) interface{} {
			resolve := promiseArgs[0]
			reject := promiseArgs[1]

			go func() {
				outputBytes, err := fn(inputBytes, options)
				if err != nil {
					reject.Invoke(js.Global().Get("Error").New(err.Error()))
					return
				}
				resolve.Invoke(BytesToUint8Array(outputBytes))
			}()

			return nil
		})

		promise := js.Global().Get("Promise").New(handler)
		handler.Release()
		return promise
	})
}

// WrapMultiInputAsyncFunc wraps a function that takes multiple Uint8Arrays
func WrapMultiInputAsyncFunc(fn func([][]byte, js.Value) ([]byte, error)) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) < 1 {
			return createRejectedPromise("missing input argument")
		}

		inputsArr := args[0]
		var options js.Value
		if len(args) > 1 {
			options = args[1]
		} else {
			options = js.Undefined()
		}

		// Copy all input data before returning
		length := inputsArr.Get("length").Int()
		inputs := make([][]byte, length)
		for i := 0; i < length; i++ {
			inputs[i] = Uint8ArrayToBytes(inputsArr.Index(i))
		}

		handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) interface{} {
			resolve := promiseArgs[0]
			reject := promiseArgs[1]

			go func() {
				outputBytes, err := fn(inputs, options)
				if err != nil {
					reject.Invoke(js.Global().Get("Error").New(err.Error()))
					return
				}
				resolve.Invoke(BytesToUint8Array(outputBytes))
			}()

			return nil
		})

		promise := js.Global().Get("Promise").New(handler)
		handler.Release()
		return promise
	})
}

func createRejectedPromise(message string) js.Value {
	return js.Global().Get("Promise").Call("reject",
		js.Global().Get("Error").New(message))
}
