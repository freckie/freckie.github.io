package main

import (
	"bytes"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"syscall/js"

	"github.com/freckie/blog-tools/pkg/jsutil"
	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/types"
	_ "golang.org/x/image/webp"
)

func init() {
	api.DisableConfigDir()
}

func main() {
	js.Global().Set("pngToPdf", js.ValueOf(map[string]interface{}{
		"convert": jsutil.WrapMultiInputAsyncFunc(convertToPdf),
	}))

	select {}
}

func convertToPdf(images [][]byte, options js.Value) ([]byte, error) {
	// Get page size option
	pageSize := "fit"
	if !options.IsUndefined() && !options.IsNull() {
		ps := options.Get("pageSize")
		if !ps.IsUndefined() && !ps.IsNull() {
			pageSize = ps.String()
		}
	}

	// Create import configuration
	imp := pdfcpu.DefaultImportConfig()

	// Determine page dimensions
	switch pageSize {
	case "a4", "A4":
		imp.PageDim = &types.Dim{Width: 595.28, Height: 841.89}
		imp.UserDim = true
	case "letter", "Letter":
		imp.PageDim = &types.Dim{Width: 612, Height: 792}
		imp.UserDim = true
	case "fit":
		// Get first image dimensions to set page size
		img, _, err := image.DecodeConfig(bytes.NewReader(images[0]))
		if err == nil {
			imp.PageDim = &types.Dim{Width: float64(img.Width), Height: float64(img.Height)}
		} else {
			// Default to A4 if we can't read image
			imp.PageDim = &types.Dim{Width: 595.28, Height: 841.89}
		}
		imp.UserDim = true
	}

	imp.Pos = types.Center
	imp.ScaleAbs = false

	// Convert byte slices to io.Reader
	readers := make([]io.Reader, len(images))
	for i, img := range images {
		readers[i] = bytes.NewReader(img)
	}

	// Create PDF from images
	var buf bytes.Buffer
	if err := api.ImportImages(nil, &buf, readers, imp, nil); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
