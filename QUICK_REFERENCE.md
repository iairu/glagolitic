# Quick Reference - Glagolitic Converter

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run tauri dev

# Build for current platform
npm run tauri build
```

## 📋 Commands Cheat Sheet

### Development
```bash
npm run dev              # SvelteKit dev server only
npm run tauri dev        # Full Tauri dev app (recommended)
npm run build            # Build frontend
npm run preview          # Preview production build
```

### Building
```bash
npm run tauri build                          # Current platform
npm run tauri build --target x86_64-apple-darwin          # macOS Intel
npm run tauri build --target aarch64-apple-darwin         # macOS Silicon
npm run tauri build --target x86_64-pc-windows-msvc       # Windows
npm run tauri build --target x86_64-unknown-linux-gnu     # Linux
```

### Scripts
```bash
./build-all.sh --current        # Build (macOS/Linux)
./build-all.sh --macos-intel    # macOS Intel
./build-all.sh --macos-silicon  # macOS Silicon
./build-all.bat                 # Build (Windows)
npm run icons:generate          # Generate icons
```

## ⌨️ Keyboard Shortcuts

| Keys | Action |
|------|--------|
| `⌘K` | Convert |
| `⌘⇧X` | Swap |
| `⌘⌫` | Clear |
| `⌘C` | Copy |

## 📁 Key Files

```
src/routes/+page.svelte    # Main UI
src/lib/converter.js       # Conversion logic
src-tauri/tauri.conf.json  # Tauri config
src-tauri/Cargo.toml       # Rust deps
package.json               # Node deps
.github/workflows/         # CI/CD
```

## 🎨 UI Components

- **Header**: Glass effect with title and actions
- **Input Panel**: Left side, editable text
- **Output Panel**: Right side, read-only result
- **Footer**: Keyboard shortcuts reference

## 🔧 Common Tasks

### Add New Character Mapping
Edit `src/lib/converter.js`:
```javascript
const latinToGlagoliticMap = {
  // Add new mapping
  'X': 'Ⱘ',
  'x': 'Ⱙ'
};
```

### Change Window Size
Edit `src-tauri/tauri.conf.json`:
```json
"windows": [{
  "width": 1400,
  "height": 900
}]
```

### Add New Shortcut
Edit `src/routes/+page.svelte`:
```javascript
function handleKeydown(event) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Y') {
    event.preventDefault();
    // Your action here
  }
}
```

### Update App Version
Edit both files:
```json
// package.json
"version": "1.0.1"

// src-tauri/tauri.conf.json
"version": "1.0.1"
```

## 🐛 Debugging

### Frontend
```bash
# Enable dev tools in Tauri
# Right-click → Inspect Element
# Or press Cmd+Option+I (macOS) / Ctrl+Shift+I (Windows/Linux)
```

### Rust Backend
```bash
# Run with logging
RUST_LOG=debug npm run tauri dev

# Check logs in:
# macOS: ~/Library/Caches/com.glagolitic.app/log/
# Windows: %LOCALAPPDATA%\com.glagolitic.app\log\
# Linux: ~/.cache/com.glagolitic.app/log/
```

### Build Issues
```bash
# Clear caches
rm -rf node_modules src-tauri/target
npm install
cargo clean
```

## 📦 Dependencies

### Frontend
- `@sveltejs/kit` - App framework
- `@tauri-apps/api` - Tauri API
- `svelte` - UI framework
- `vite` - Build tool

### Backend
- `tauri` - Desktop framework
- `tauri-plugin-log` - Logging
- `tauri-plugin-shell` - Shell access
- `serde` - Serialization

## 🌐 CI/CD

### Trigger Build
```bash
# Tag for release
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will build automatically
```

### Download Artifacts
- Go to GitHub Actions
- Select workflow run
- Download artifacts section

## 📱 Platform Notes

### macOS
- Requires Xcode Command Line Tools
- Universal builds need both targets
- Code signing required for distribution

### Windows
- Requires Visual Studio Build Tools
- MSVC target for Windows
- Consider both MSI and NSIS

### Linux
- Install webkit2gtk dependencies
- AppImage most portable
- DEB for Debian/Ubuntu, RPM for Fedora

## 🔐 Code Signing

### macOS (Notarization)
```bash
# In tauri.conf.json
"macOS": {
  "signingIdentity": "Developer ID Application: Name",
  "hardenedRuntime": true
}
```

### Windows
```bash
# In tauri.conf.json
"windows": {
  "certificateThumbprint": "ABC123..."
}
```

## 📊 Performance

### Optimize Build Size
```toml
# src-tauri/Cargo.toml
[profile.release]
lto = true          # Link-time optimization
codegen-units = 1   # Single compilation unit
opt-level = "s"     # Optimize for size
strip = true        # Remove debug symbols
```

### Faster Dev Builds
```toml
# Temporarily disable for faster iteration
lto = false
codegen-units = 16
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Text conversion works
- [ ] Keyboard shortcuts work
- [ ] Copy to clipboard works
- [ ] Language swap works
- [ ] Clear function works
- [ ] Window resizing works
- [ ] Character count updates

### Automated Testing (Future)
```bash
# Add to package.json
"test": "vitest",
"test:ui": "vitest --ui"
```

## 📞 Resources

- **Tauri Docs**: https://tauri.app/
- **Svelte Docs**: https://svelte.dev/
- **Rust Docs**: https://doc.rust-lang.org/
- **GitHub**: https://github.com/yourusername/glagolitic-app

---

Last updated: March 2024
