package main

import (
	"bytes"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"syscall/js"

	"github.com/freckie/blog-tools/pkg/jsutil"
	"golang.org/x/image/draw"
	_ "golang.org/x/image/webp"
)

func main() {
	js.Global().Set("imageResizer", js.ValueOf(map[string]interface{}{
		"resize": jsutil.WrapAsyncFunc(resizeImage),
	}))

	// Keep the program running
	select {}
}

func resizeImage(inputBytes []byte, options js.Value) ([]byte, error) {
	// Parse options
	width := options.Get("width").Int()
	height := options.Get("height").Int()
	format := options.Get("format").String()

	if width <= 0 || height <= 0 {
		return nil, fmt.Errorf("invalid dimensions: %dx%d", width, height)
	}

	// Decode image
	src, _, err := image.Decode(bytes.NewReader(inputBytes))
	if err != nil {
		return nil, fmt.Errorf("failed to decode image: %w", err)
	}

	// Create resized image
	dst := image.NewRGBA(image.Rect(0, 0, width, height))

	// Use high-quality resampling
	draw.CatmullRom.Scale(dst, dst.Bounds(), src, src.Bounds(), draw.Over, nil)

	// Encode output
	var buf bytes.Buffer
	switch format {
	case "png":
		err = png.Encode(&buf, dst)
	case "jpeg", "jpg":
		err = jpeg.Encode(&buf, dst, &jpeg.Options{Quality: 90})
	case "gif":
		err = gif.Encode(&buf, dst, nil)
	default:
		// Default to PNG
		err = png.Encode(&buf, dst)
	}

	if err != nil {
		return nil, fmt.Errorf("failed to encode image: %w", err)
	}

	return buf.Bytes(), nil
}
