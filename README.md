# ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ - Glagolitic Converter

A beautiful, native desktop application for converting text between Latin and Glagolitic scripts. Built with Tauri 2.0 and SvelteKit, featuring a modern liquid glass macOS-style interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
![Tauri](https://img.shields.io/badge/Tauri-2.0-24C8DB)
![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00)

## ✨ Features

- 🔄 **Real-time Conversion** - Instant conversion between Latin and Glagolitic scripts
- ⌨️ **Native Keybindings** - Keyboard shortcuts for power users
- 🎨 **Liquid Glass UI** - Beautiful macOS-style interface with glassmorphism effects
- 🌐 **Cross-Platform** - Native builds for macOS (Intel & Apple Silicon), Windows, and Linux
- 📋 **Quick Copy** - One-click copy of converted text
- 🔄 **Swap Languages** - Easily switch between input/output languages

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Convert text |
| `⌘⇧X` / `Ctrl+Shift+X` | Swap languages |
| `⌘⌫` / `Ctrl+Backspace` | Clear all text |
| `⌘C` / `Ctrl+C` | Copy output (when output focused) |

## 🚀 Installation

### macOS

#### Apple Silicon (M1/M2/M3)
```bash
# Download the .dmg from Releases
# Or build locally:
npm run tauri build --target aarch64-apple-darwin
```

#### Intel Macs
```bash
# Download the .dmg from Releases
# Or build locally:
npm run tauri build --target x86_64-apple-darwin
```

#### Universal Binary (Both architectures)
```bash
npm run tauri build
```

### Windows

```bash
# MSI Installer
npm run tauri build --target x86_64-pc-windows-msvc

# NSIS Installer (.exe)
npm run tauri build
```

### Linux

```bash
# AppImage (recommended)
npm run tauri build --target x86_64-unknown-linux-gnu

# DEB package (Debian/Ubuntu)
npm run tauri build

# RPM package (Fedora/RHEL)
npm run tauri build
```

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- [Rust](https://rustup.rs/) 1.70+
- Platform-specific dependencies:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Visual Studio C++ Build Tools
  - **Linux**: See [Tauri Linux prerequisites](https://tauri.app/start/prerequisites/)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/glagolitic-app.git
cd glagolitic-app

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

### Build Commands

```bash
# Build frontend only
npm run build

# Build for current platform
npm run tauri build

# Build for specific platform
npm run tauri build --target <target-triple>
```

### Available Targets

| Target Triple | Platform |
|--------------|----------|
| `x86_64-apple-darwin` | macOS Intel |
| `aarch64-apple-darwin` | macOS Apple Silicon |
| `x86_64-pc-windows-msvc` | Windows 64-bit |
| `x86_64-unknown-linux-gnu` | Linux 64-bit |

## 📦 Project Structure

```
glagolitic-app/
├── src/                    # SvelteKit frontend
│   ├── lib/
│   │   └── converter.js    # Conversion logic
│   └── routes/
│       └── +page.svelte    # Main UI component
├── src-tauri/              # Tauri backend (Rust)
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── icons/              # App icons
│   ├── Cargo.toml
│   └── tauri.conf.json
├── .github/
│   └── workflows/          # CI/CD pipelines
└── package.json
```

## 🎨 Design

The application features a **liquid glass** design inspired by macOS Big Sur and later:

- **Glassmorphism** - Translucent panels with backdrop blur
- **Vibrant Gradients** - Purple-pink gradient background
- **Native Feel** - System-like appearance and keybindings
- **Responsive** - Adapts to different window sizes

## 🔄 Glagolitic Script Support

The converter supports the full range of Glagolitic characters:

### Uppercase
```
Latin:  A B V G D E Ž Z I J K L M N O P R S T U F H C Č Š Y Ě Ę Ū Ŏ
Glag:   Ⰰ Ⰱ Ⰲ Ⰳ Ⰴ Ⰵ Ⰶ Ⰷ Ⰹ Ⰺ Ⰽ Ⰾ Ⰿ Ⱀ Ⱁ Ⱂ Ⱃ Ⱄ Ⱅ Ⱆ Ⱇ Ⱈ Ⱌ Ⱍ Ⱎ Ⱏ Ⱑ Ⱗ Ⱚ Ⱛ
```

### Lowercase
```
Latin:  a b v g d e ž z i j k l m n o p r s t u f h c č š y ě ę ū ŏ
Glag:   ⰰ ⰱ ⰲ ⰳ ⰴ ⰵ ⰶ ⰷ ⰹ ⰺ ⰽ ⰾ ⰿ ⱀ ⱁ ⱂ ⱃ ⱄ ⱅ ⱆ ⱇ ⱈ ⱌ ⱍ ⱎ ⱏ ⱡ ⱦ Ⱬ ⱬ
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Glagolitic script](https://en.wikipedia.org/wiki/Glagolitic_script) - The oldest known Slavic alphabet
- [Tauri](https://tauri.app/) - Build smaller, faster, and more secure desktop applications
- [Svelte](https://svelte.dev/) - Cybernetically enhanced web apps

## 📞 Support

If you have any questions or issues, please open an issue on the GitHub repository.

---

Made with ❤️ for preserving Slavic heritage
