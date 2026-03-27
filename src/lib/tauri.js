// Tauri environment detection
export const isTauri = window && window.__TAURI__;

// Platform detection
export const platform = isTauri ? 
    (async () => {
        const { os } = await import('@tauri-apps/api');
        return await os.platform();
    })() : 
    'web';
