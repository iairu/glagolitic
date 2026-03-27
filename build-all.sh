#!/bin/bash
# Build script for all platforms
# Usage: ./build-all.sh

set -e

echo "🔨 Glagolitic Converter - Multi-Platform Build Script"
echo "======================================================"

cd "$(dirname "$0")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$1]${NC} $2"
}

print_success() {
    echo -e "${GREEN}[$1]${NC} $2"
}

print_warning() {
    echo -e "${YELLOW}[$1]${NC} $2"
}

print_error() {
    echo -e "${RED}[$1]${NC} $2"
}

# Check prerequisites
check_prereqs() {
    print_status "PREREQS" "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        print_error "PREREQS" "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "PREREQS" "npm is not installed"
        exit 1
    fi
    
    if ! command -v cargo &> /dev/null; then
        print_error "PREREQS" "Rust/Cargo is not installed"
        exit 1
    fi
    
    print_success "PREREQS" "All prerequisites found"
}

# Install dependencies
install_deps() {
    print_status "DEPS" "Installing dependencies..."
    npm ci
    print_success "DEPS" "Dependencies installed"
}

# Build frontend
build_frontend() {
    print_status "BUILD" "Building frontend..."
    npm run build
    print_success "BUILD" "Frontend built successfully"
}

# Build for current platform
build_current() {
    print_status "TAURI" "Building for current platform..."
    npm run tauri build
    print_success "TAURI" "Build completed for current platform"
}

# Show help
show_help() {
    echo "Usage: ./build-all.sh [OPTION]"
    echo ""
    echo "Build Glagolitic Converter for various platforms"
    echo ""
    echo "Options:"
    echo "  --frontend      Build frontend only"
    echo "  --current       Build for current platform"
    echo "  --macos-intel   Build for macOS Intel (x86_64)"
    echo "  --macos-silicon Build for macOS Apple Silicon (aarch64)"
    echo "  --windows       Build for Windows"
    echo "  --linux         Build for Linux"
    echo "  --all           Build for all platforms (requires cross-compilation)"
    echo "  --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./build-all.sh --frontend     # Build frontend only"
    echo "  ./build-all.sh --current      # Build for current platform"
    echo "  ./build-all.sh --macos-intel  # Build for macOS Intel"
}

# Main build function
main() {
    case "$1" in
        --frontend)
            check_prereqs
            install_deps
            build_frontend
            ;;
        --current)
            check_prereqs
            install_deps
            build_frontend
            build_current
            ;;
        --macos-intel)
            check_prereqs
            install_deps
            build_frontend
            print_status "TAURI" "Building for macOS Intel..."
            npm run tauri build -- --target x86_64-apple-darwin
            print_success "TAURI" "macOS Intel build completed"
            ;;
        --macos-silicon)
            check_prereqs
            install_deps
            build_frontend
            print_status "TAURI" "Building for macOS Apple Silicon..."
            npm run tauri build -- --target aarch64-apple-darwin
            print_success "TAURI" "macOS Apple Silicon build completed"
            ;;
        --windows)
            check_prereqs
            install_deps
            build_frontend
            print_status "TAURI" "Building for Windows..."
            npm run tauri build -- --target x86_64-pc-windows-msvc
            print_success "TAURI" "Windows build completed"
            ;;
        --linux)
            check_prereqs
            install_deps
            build_frontend
            print_status "TAURI" "Building for Linux..."
            npm run tauri build -- --target x86_64-unknown-linux-gnu
            print_success "TAURI" "Linux build completed"
            ;;
        --help|-h)
            show_help
            ;;
        *)
            check_prereqs
            install_deps
            build_frontend
            build_current
            print_success "BUILD" "Default build completed"
            ;;
    esac
}

main "$@"
