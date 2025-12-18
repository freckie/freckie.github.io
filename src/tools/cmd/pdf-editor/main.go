package main

import (
	"bytes"
	"fmt"
	"io"
	"syscall/js"

	"github.com/freckie/blog-tools/pkg/jsutil"
	"github.com/pdfcpu/pdfcpu/pkg/api"
)

func init() {
	api.DisableConfigDir()
}

func main() {
	js.Global().Set("pdfEditor", js.ValueOf(map[string]interface{}{
		"extractPages": jsutil.WrapAsyncFunc(extractPages),
	}))

	select {}
}

// extractPages extracts and reorders pages from a PDF
// options: { pages: [1, 3, 2] } - array of original page numbers in desired order
func extractPages(pdfBytes []byte, options js.Value) ([]byte, error) {
	if options.IsUndefined() || options.IsNull() {
		return nil, fmt.Errorf("options required")
	}

	pagesVal := options.Get("pages")
	if pagesVal.IsUndefined() || pagesVal.IsNull() {
		return nil, fmt.Errorf("pages array required")
	}

	length := pagesVal.Get("length").Int()
	if length == 0 {
		return nil, fmt.Errorf("at least one page required")
	}

	// Get page numbers in desired order
	pages := make([]int, length)
	for i := 0; i < length; i++ {
		pages[i] = pagesVal.Index(i).Int()
	}

	// Extract each page individually and merge in order
	var pageBuffers [][]byte

	for _, pageNum := range pages {
		reader := bytes.NewReader(pdfBytes)
		var pageBuf bytes.Buffer
		pageStr := fmt.Sprintf("%d", pageNum)
		if err := api.Collect(reader, &pageBuf, []string{pageStr}, nil); err != nil {
			return nil, fmt.Errorf("failed to extract page %d: %w", pageNum, err)
		}
		pageBuffers = append(pageBuffers, pageBuf.Bytes())
	}

	// If only one page, return it directly
	if len(pageBuffers) == 1 {
		return pageBuffers[0], nil
	}

	// Merge extracted pages in order
	readers := make([]io.ReadSeeker, len(pageBuffers))
	for i, pb := range pageBuffers {
		readers[i] = bytes.NewReader(pb)
	}

	var buf bytes.Buffer
	if err := api.MergeRaw(readers, &buf, false, nil); err != nil {
		return nil, fmt.Errorf("failed to merge pages: %w", err)
	}

	return buf.Bytes(), nil
}
