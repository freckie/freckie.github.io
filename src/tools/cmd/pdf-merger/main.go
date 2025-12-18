package main

import (
	"bytes"
	"io"
	"syscall/js"

	"github.com/freckie/blog-tools/pkg/jsutil"
	"github.com/pdfcpu/pdfcpu/pkg/api"
)

func init() {
	api.DisableConfigDir()
}

func main() {
	js.Global().Set("pdfMerger", js.ValueOf(map[string]interface{}{
		"merge": jsutil.WrapMultiInputAsyncFunc(mergePdfs),
	}))

	select {}
}

func mergePdfs(pdfs [][]byte, options js.Value) ([]byte, error) {
	readers := make([]io.ReadSeeker, len(pdfs))
	for i, pdf := range pdfs {
		readers[i] = bytes.NewReader(pdf)
	}

	var buf bytes.Buffer
	if err := api.MergeRaw(readers, &buf, false, nil); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
