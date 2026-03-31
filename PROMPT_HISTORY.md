create a converter between latin and glagolitic script in tauri+svelte combination, native keybindings, and with ci/cd and build output for macos (intel), macos (apple silicon), windows and linux, utilize an interface similar to google translate, but make it look like native macos with liquid glass efect

remove color from the background gradient, make the background completely white and text black when macos light mode is on, and background dark (flush with macos) with white text when macos dark mode is on

add pulsating icon when app is loading

---

add accessibility button support for text enlarging and making small, make the zoom in and zoom out keybinds act as these accessibility buttons

add support for simple syriac script (arameic)

update README

---

fix the github workflow to properly compile the app for macos (dmg universal binary), windows (msi) and linux (AppImage), currently it fails on linux,windows and macos silicon with same error and with macos intel getting cancelled:

Run actions/setup-node@v4
Found in cache @ /opt/hostedtoolcache/node/20.20.1/x64
Environment details
/opt/hostedtoolcache/node/20.20.1/x64/bin/npm config get cache
/home/runner/.npm
Error: Some specified paths were not resolved, unable to cache dependencies.