# Setup Guide - Glagolitic Converter

## Quick Start

### 1. Install Prerequisites

#### macOS
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Windows
```powershell
# Install Node.js from https://nodejs.org/

# Install Visual Studio Build Tools
# Download from: https://visualstudio.microsoft.com/downloads/
# Select "Desktop development with C++"

# Install Rust
# Download and run: https://win.rustup.rs/x86_64
```

#### Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Tauri dependencies
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    libgstreamer1.0-dev \
    libgstreamer-plugins-base1.0-dev \
    libjavascriptcoregtk-4.1-dev \
    libsoup-3.0-dev
```

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/glagolitic-app.git
cd glagolitic-app

# Install dependencies
npm install
```

### 3. Generate Icons (Optional but Recommended)

```bash
# Install sharp for icon generation
npm install sharp

# Generate all icon sizes
npm run icons:generate

# Or manually create icons from src-tauri/icons/icon.svg
# using your favorite image editor or online tool
```

### 4. Development

```bash
# Start development server
npm run tauri dev
```

### 5. Build

```bash
# Build for current platform
npm run tauri build

# Or use the build script
./build-all.sh --current    # macOS/Linux
build-all.bat              # Windows
```

## Platform-Specific Builds

### macOS Intel
```bash
npm run tauri build --target x86_64-apple-darwin
```

### macOS Apple Silicon
```bash
npm run tauri build --target aarch64-apple-darwin
```

### macOS Universal (Both architectures)
```bash
# Method 1: Using cargo lipo (requires installation)
cargo install cargo-lipo
npm run tauri build --target universal-apple-darwin

# Method 2: Build separately and merge
npm run tauri build --target x86_64-apple-darwin
npm run tauri build --target aarch64-apple-darwin
# Then use lipo to merge the binaries
```

### Windows
```bash
npm run tauri build --target x86_64-pc-windows-msvc
```

### Linux
```bash
npm run tauri build --target x86_64-unknown-linux-gnu
```

## Icon Generation

### Using macOS iconutil
```bash
# Create iconset directory
mkdir icon.iconset

# Copy SVG and create PNGs at various sizes
cp src-tauri/icons/icon.svg icon.iconset/icon_512x512.svg

# Generate PNGs
sips -z 16 16     icon.iconset/icon_512x512.svg --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.iconset/icon_512x512.svg --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.iconset/icon_512x512.svg --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.iconset/icon_512x512.svg --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.iconset/icon_512x512.svg --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.iconset/icon_512x512.svg --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.iconset/icon_512x512.svg --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.iconset/icon_512x512.svg --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.iconset/icon_512x512.svg --out icon.iconset/icon_512x512@2x.png

# Create .icns file
iconutil -c icns icon.iconset -o src-tauri/icons/icon.icns

# Clean up
rm -rf icon.iconset
```

### Using ImageMagick
```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Generate PNGs
convert src-tauri/icons/icon.svg -resize 32x32 src-tauri/icons/32x32.png
convert src-tauri/icons/icon.svg -resize 128x128 src-tauri/icons/128x128.png
convert src-tauri/icons/icon.svg -resize 256x256 src-tauri/icons/128x128@2x.png

# Create ICO file (Windows)
convert src-tauri/icons/*.png -colors 256 src-tauri/icons/icon.ico
```

### Using Online Tools
1. Go to https://convertio.co/svg-png/
2. Upload `src-tauri/icons/icon.svg`
3. Download PNGs at required sizes
4. Place in `src-tauri/icons/` directory

### Using Figma/Sketch
1. Import `src-tauri/icons/icon.svg`
2. Export at sizes: 32x32, 128x128, 256x256
3. For macOS: Export as .icns using export plugins
4. For Windows: Export as .ico using export plugins

## Troubleshooting

### Build fails with "webkit2gtk not found" (Linux)
```bash
sudo apt install libwebkit2gtk-4.1-dev
```

### Build fails with "gtk-3 not found" (Linux)
```bash
sudo apt install libgtk-3-dev
```

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Rust compilation errors
```bash
# Update Rust
rustup update

# Clear cargo cache
cd src-tauri
cargo clean
cd ..
npm install
```

### Tauri CLI not found
```bash
# Install Tauri CLI globally
npm install -g @tauri-apps/cli

# Or use npx
npx tauri build
```

### macOS signing issues
```bash
# For development builds, signing is optional
# For distribution, you need an Apple Developer account
# See: https://tauri.app/distribute/signature/mac-os/
```

## Performance Tips

### Faster Builds
```bash
# Use release profile with optimizations
# Edit src-tauri/Cargo.toml:
[profile.release]
lto = false  # Disable for faster builds (larger binary)
codegen-units = 16  # More parallelism
```

### Development Mode
```bash
# Enable faster compilation in debug mode
# The app will be larger but build faster
```

## Next Steps

1. Test the application on your target platforms
2. Generate proper icons for distribution
3. Set up code signing for your platform
4. Configure auto-updates (optional)
5. Submit to app stores (optional)

## Resources

- [Tauri Documentation](https://tauri.app/)
- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Rust Documentation](https://doc.rust-lang.org/)
- [Node.js Documentation](https://nodejs.org/)

---

For more help, open an issue on GitHub or check the main README.md
