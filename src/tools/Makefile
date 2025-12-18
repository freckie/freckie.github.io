WASM_OUT = ../../public/wasm

.PHONY: all clean image-resizer png-to-pdf pdf-merger pdf-editor

all: image-resizer png-to-pdf pdf-merger pdf-editor

image-resizer:
	GOOS=js GOARCH=wasm go build -o $(WASM_OUT)/image-resizer.wasm ./cmd/image-resizer

png-to-pdf:
	GOOS=js GOARCH=wasm go build -o $(WASM_OUT)/png-to-pdf.wasm ./cmd/png-to-pdf

pdf-merger:
	GOOS=js GOARCH=wasm go build -o $(WASM_OUT)/pdf-merger.wasm ./cmd/pdf-merger

pdf-editor:
	GOOS=js GOARCH=wasm go build -o $(WASM_OUT)/pdf-editor.wasm ./cmd/pdf-editor

clean:
	rm -f $(WASM_OUT)/*.wasm
