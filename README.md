# Paint by Numbers Generator

An AI-powered web application and CLI tool that converts images into paint-by-numbers templates. This tool uses advanced image processing algorithms including K-means clustering, facet detection, and border tracing to create printable paint-by-numbers patterns.

## Features

- **Web Interface**: Modern, responsive web application with drag-and-drop support
- **CLI Tool**: Command-line interface for batch processing
- **Advanced Image Processing**:
  - K-means color clustering (RGB, HSL, LAB color spaces)
  - Automatic facet detection and reduction
  - Border tracing and segmentation
  - Smart label placement
- **Customizable Settings**:
  - Number of colors (8-32 recommended)
  - Image resizing options
  - Facet size and cleanup parameters
  - Border smoothing
  - Color restrictions
- **Export Options**:
  - SVG output (scalable vector graphics)
  - PNG export
  - Color palette download
  - Multiple output profiles (CLI)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd -paintbynumber
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Web Interface

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:10001`

3. Upload an image or use one of the example images

4. Adjust settings as needed:
   - **Number of Colors**: Recommended 8-32 colors
   - **Cluster Precision**: Lower values = more accurate clustering
   - **Color Space**: Choose RGB, HSL, or LAB
   - **Facet Settings**: Control minimum facet size and maximum number of facets

5. Click "Process Image" to generate your paint-by-numbers template

6. Download the result as SVG or PNG

### CLI Tool

The CLI tool allows batch processing of images from the command line.

**Basic Usage:**
```bash
node src-cli/main.js -i <input_image> -o <output_file> [-c <settings_json>]
```

**Example:**
```bash
node src-cli/main.js -i testinput.png -o output.svg -c src-cli/settings.json
```

**Parameters:**
- `-i`: Input image path (required)
- `-o`: Output file path (required)
- `-c`: Settings JSON file path (optional, defaults to `settings.json`)

**Settings File:**
The CLI uses a JSON configuration file. See `src-cli/settings.json` for an example configuration with multiple output profiles.

## Project Structure

```
-paintbynumber/
├── src/                    # Main source code
│   ├── main.ts            # Web application entry point
│   ├── gui.ts             # GUI logic and event handlers
│   ├── settings.ts        # Settings management
│   ├── colorreductionmanagement.ts  # Color reduction algorithms
│   ├── facetCreator.ts    # Facet detection
│   ├── facetReducer.ts    # Facet reduction
│   ├── facetBorderTracer.ts  # Border tracing
│   ├── facetBorderSegmenter.ts  # Border segmentation
│   ├── facetLabelPlacer.ts  # Label placement
│   ├── lib/               # Core libraries
│   ├── structs/           # Data structures
│   └── utils/             # Utility functions
├── src-cli/               # CLI tool source code
│   ├── main.ts           # CLI entry point
│   └── settings.json     # CLI settings example
├── scripts/              # Compiled JavaScript (generated)
├── styles/               # CSS stylesheets
├── index.html            # Web application HTML
└── package.json          # Project dependencies
```

## Development

### Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

### Watch Mode

Automatically rebuild on file changes:
```bash
npm run watch
```

### Scripts

- `npm start` - Start the development server (lite-server on port 10001)
- `npm run build` - Build the TypeScript project
- `npm run watch` - Watch mode for development

## Technical Details

### Image Processing Pipeline

1. **Image Loading**: Load and optionally resize input image
2. **K-means Clustering**: Reduce colors using K-means algorithm in selected color space
3. **Facet Creation**: Detect connected regions of the same color
4. **Facet Reduction**: Remove small facets and limit total facet count
5. **Border Tracing**: Trace borders of each facet
6. **Border Segmentation**: Smooth borders by segmenting paths
7. **Label Placement**: Determine optimal positions for color number labels
8. **SVG Generation**: Generate final SVG output with labels and colors

### Color Spaces

- **RGB**: Standard red-green-blue color space
- **HSL**: Hue-saturation-lightness color space (better for perceptual clustering)
- **LAB**: CIELAB color space (most accurate perceptual clustering)

## Browser Support

- Modern browsers with ES6+ support
- Canvas API support required
- Drag and drop API support recommended

## License

See LICENSE file for details.

## Author

drake7707

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

