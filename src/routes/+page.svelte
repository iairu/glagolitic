<script>
	import { onMount } from 'svelte';
	import { latinToGlagolitic, glagoliticToLatin } from '$lib/converter.js';

	let inputText = '';
	let outputText = '';
	let inputLang = 'latin';
	let outputLang = 'glagolitic';
	let isConverting = false;
	let charCount = 0;

	// Swap languages
	function swapLanguages() {
		const temp = inputLang;
		inputLang = outputLang;
		outputLang = temp;
		
		const tempText = inputText;
		inputText = outputText;
		outputText = tempText;
		
		updateCharCount();
	}

	// Clear all text
	function clearAll() {
		inputText = '';
		outputText = '';
		updateCharCount();
	}

	// Copy output to clipboard
	async function copyOutput() {
		// Use navigator.clipboard (works in both web and Tauri)
		await navigator.clipboard.writeText(outputText);
	}

	// Update character count
	function updateCharCount() {
		charCount = inputText.length;
	}

	// Convert text based on selected languages
	function convertText() {
		isConverting = true;
		
		setTimeout(() => {
			if (inputLang === 'latin' && outputLang === 'glagolitic') {
				outputText = latinToGlagolitic(inputText);
			} else if (inputLang === 'glagolitic' && outputLang === 'latin') {
				outputText = glagoliticToLatin(inputText);
			}
			
			isConverting = false;
			updateCharCount();
		}, 50);
	}

	// Handle input changes
	function handleInput() {
		convertText();
	}

	// Handle keyboard shortcuts directly
	function handleKeydown(event) {
		// Cmd/Ctrl + K: Convert
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			convertText();
		}
		
		// Cmd/Ctrl + Shift + X: Swap
		if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'X') {
			event.preventDefault();
			swapLanguages();
		}
		
		// Cmd/Ctrl + Backspace: Clear
		if ((event.metaKey || event.ctrlKey) && event.key === 'Backspace') {
			event.preventDefault();
			clearAll();
		}
		
		// Cmd/Ctrl + C: Copy output (when output is focused)
		if ((event.metaKey || event.ctrlKey) && event.key === 'c' && document.activeElement?.id === 'output') {
			event.preventDefault();
			copyOutput();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<title>Glagolitic Converter</title>
</svelte:head>

<div class="container">
	<!-- Header with glass effect -->
	<header class="header">
		<div class="header-content">
			<h1>
				<span class="glagolitic-title">ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ</span>
				<span class="latin-title">Glagolitic Converter</span>
			</h1>
			<div class="header-actions">
				<button class="icon-btn" onclick={swapLanguages} title="Swap (⌘⇧X)">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
					</svg>
				</button>
				<button class="icon-btn" onclick={clearAll} title="Clear (⌘Backspace)">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6L18 18"/>
					</svg>
				</button>
			</div>
		</div>
	</header>

	<!-- Main conversion area -->
	<main class="converter">
		<!-- Input panel -->
		<div class="panel input-panel">
			<div class="panel-header">
				<select bind:value={inputLang} class="lang-select">
					<option value="latin">Latin</option>
					<option value="glagolitic">Glagolitic (ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ)</option>
				</select>
				<span class="char-count">{charCount} chars</span>
			</div>
			<textarea
				id="input"
				bind:value={inputText}
				oninput={handleInput}
				placeholder="Type or paste text here..."
				autocomplete="off"
				spellcheck="false"
			></textarea>
		</div>

		<!-- Output panel -->
		<div class="panel output-panel">
			<div class="panel-header">
				<select bind:value={outputLang} class="lang-select">
					<option value="glagolitic">Glagolitic (ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ)</option>
					<option value="latin">Latin</option>
				</select>
				<button class="copy-btn" onclick={copyOutput} title="Copy (⌘C)">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
						<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
					</svg>
					Copy
				</button>
			</div>
			<textarea 
				id="output"
				readonly
				value={outputText}
				placeholder="Translation will appear here..."
			></textarea>
		</div>
	</main>

	<!-- Footer with shortcuts hint -->
	<footer class="footer">
		<div class="shortcuts">
			<span class="shortcut"><kbd>⌘K</kbd> Convert</span>
			<span class="shortcut"><kbd>⌘⇧X</kbd> Swap</span>
			<span class="shortcut"><kbd>⌘⌫</kbd> Clear</span>
			<span class="shortcut"><kbd>⌘C</kbd> Copy</span>
		</div>
	</footer>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
		min-height: 100vh;
		overflow: hidden;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 20px;
		gap: 16px;
	}

	/* Liquid Glass Header */
	.header {
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			inset 0 -1px 0 rgba(255, 255, 255, 0.1);
		padding: 16px 24px;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.glagolitic-title {
		font-size: 24px;
		font-weight: 700;
		background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: 2px;
	}

	.latin-title {
		font-size: 14px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
	}

	.header-actions {
		display: flex;
		gap: 8px;
	}

	.icon-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		padding: 8px;
		cursor: pointer;
		color: white;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.05);
	}

	.icon-btn:active {
		transform: scale(0.95);
	}

	/* Converter Panels */
	.converter {
		display: flex;
		gap: 16px;
		flex: 1;
		min-height: 0;
	}

	.panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		overflow: hidden;
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.lang-select {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		padding: 8px 12px;
		color: white;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		outline: none;
		transition: all 0.2s ease;
	}

	.lang-select:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.lang-select option {
		background: #1a1a2e;
		color: white;
	}

	.char-count {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 500;
	}

	.copy-btn {
		background: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		padding: 6px 12px;
		color: white;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		transition: all 0.2s ease;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.copy-btn:active {
		transform: scale(0.98);
	}

	textarea {
		flex: 1;
		background: transparent;
		border: none;
		padding: 20px;
		color: white;
		font-size: 18px;
		line-height: 1.6;
		resize: none;
		outline: none;
		font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	textarea#output {
		color: rgba(255, 255, 255, 0.9);
		background: rgba(0, 0, 0, 0.05);
	}

	/* Footer */
	.footer {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 12px 20px;
	}

	.shortcuts {
		display: flex;
		gap: 20px;
		justify-content: center;
	}

	.shortcut {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.7);
	}

	kbd {
		background: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		padding: 4px 8px;
		font-size: 11px;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.converter {
			flex-direction: column;
		}

		.glagolitic-title {
			font-size: 18px;
		}

		.shortcuts {
			flex-wrap: wrap;
			gap: 12px;
		}
	}

	/* Scrollbar styling */
	textarea::-webkit-scrollbar {
		width: 8px;
	}

	textarea::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 4px;
	}

	textarea::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 4px;
	}

	textarea::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}
</style>
