<script>
	import { onMount } from 'svelte';
	import { latinToGlagolitic, glagoliticToLatin, latinToSyriac, syriacToLatin } from '$lib/converter.js';

	let inputText = '';
	let outputText = '';
	let inputLang = 'latin';
	let outputLang = 'glagolitic';
	let isConverting = false;
	let charCount = 0;
	let isLoading = true;
	let fontSize = 18; // Base font size in pixels
	const minFontSize = 12;
	const maxFontSize = 32;
	const fontSizeStep = 2;

	// Dark mode detection for macOS
	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		function updateTheme(e) {
			if (e.matches) {
				document.body.classList.add('dark-mode');
			} else {
				document.body.classList.remove('dark-mode');
			}
		}

		// Initial check
		updateTheme(mediaQuery);

		// Listen for changes
		mediaQuery.addEventListener('change', updateTheme);

		return () => {
			mediaQuery.removeEventListener('change', updateTheme);
		};
	});

	// Loading state
	onMount(() => {
		// Simulate initial loading
		const timer = setTimeout(() => {
			isLoading = false;
		}, 300);

		return () => clearTimeout(timer);
	});

	// Zoom functions for accessibility
	function zoomIn() {
		if (fontSize < maxFontSize) {
			fontSize += fontSizeStep;
		}
	}

	function zoomOut() {
		if (fontSize > minFontSize) {
			fontSize -= fontSizeStep;
		}
	}

	function resetZoom() {
		fontSize = 18;
	}

	// Update CSS variable for font size
	$: {
		document.documentElement.style.setProperty('--text-font-size', `${fontSize}px`);
	}

	// Update text direction based on selected language
	$: {
		const inputTextarea = document.getElementById('input');
		const outputTextarea = document.getElementById('output');
		
		if (inputTextarea) {
			inputTextarea.setAttribute('dir', inputLang === 'syriac' ? 'rtl' : 'ltr');
		}
		if (outputTextarea) {
			outputTextarea.setAttribute('dir', outputLang === 'syriac' ? 'rtl' : 'ltr');
		}
	}

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
			} else if (inputLang === 'latin' && outputLang === 'syriac') {
				outputText = latinToSyriac(inputText);
			} else if (inputLang === 'syriac' && outputLang === 'latin') {
				outputText = syriacToLatin(inputText);
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

		// Cmd/Ctrl + = / + : Zoom in (increase font size)
		if ((event.metaKey || event.ctrlKey) && (event.key === '=' || event.key === '+')) {
			event.preventDefault();
			zoomIn();
		}

		// Cmd/Ctrl + - : Zoom out (decrease font size)
		if ((event.metaKey || event.ctrlKey) && event.key === '-') {
			event.preventDefault();
			zoomOut();
		}

		// Cmd/Ctrl + 0 : Reset zoom
		if ((event.metaKey || event.ctrlKey) && event.key === '0') {
			event.preventDefault();
			resetZoom();
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

{#if isLoading}
	<div class="loading-screen">
		<div class="loading-icon">Ⰳ</div>
	</div>
{:else}
<div class="container">
	<!-- Header with glass effect -->
	<header class="header">
		<div class="header-content">
			<h1>
				<span class="glagolitic-title">ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ</span>
				<span class="latin-title">Glagolitic Converter</span>
			</h1>
			<div class="header-actions">
				<button class="icon-btn" onclick={zoomOut} title="Zoom Out (⌘-)">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"/>
						<path d="M21 21L16.65 16.65"/>
						<path d="M8 11H14"/>
					</svg>
				</button>
				<button class="icon-btn" onclick={resetZoom} title="Reset Zoom (⌘0)">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"/>
						<path d="M21 21L16.65 16.65"/>
						<path d="M11 8V14"/>
						<path d="M8 11H14"/>
					</svg>
				</button>
				<button class="icon-btn" onclick={zoomIn} title="Zoom In (⌘+)">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"/>
						<path d="M21 21L16.65 16.65"/>
						<path d="M11 8V14"/>
						<path d="M8 11H14"/>
					</svg>
				</button>
				<div class="separator"></div>
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
					<option value="syriac">Syriac (ܠܫܢܐ ܣܘܪܝܝܐ)</option>
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
					<option value="syriac">Syriac (ܠܫܢܐ ܣܘܪܝܝܐ)</option>
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
			<span class="separator-dot"></span>
			<span class="shortcut"><kbd>⌘+</kbd> Zoom In</span>
			<span class="shortcut"><kbd>⌘-</kbd> Zoom Out</span>
			<span class="shortcut"><kbd>⌘0</kbd> Reset</span>
		</div>
	</footer>
</div>
{/if}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
		background: #ffffff;
		color: #000000;
		min-height: 100vh;
		overflow: hidden;
	}

	:global(body.dark-mode) {
		background: #1e1e1e;
		color: #ffffff;
	}

	/* Loading Screen */
	.loading-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background: #ffffff;
	}

	:global(body.dark-mode) .loading-screen {
		background: #1e1e1e;
	}

	.loading-icon {
		font-size: 72px;
		font-weight: 700;
		color: #000000;
		animation: pulse 1.5s ease-in-out infinite;
	}

	:global(body.dark-mode) .loading-icon {
		color: #ffffff;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.3;
			transform: scale(0.9);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 20px;
		gap: 16px;
	}

	/* Header */
	.header {
		background: transparent;
		border-radius: 16px;
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
		color: #000000;
		letter-spacing: 2px;
	}

	.latin-title {
		font-size: 14px;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.6);
	}

	:global(body.dark-mode) .glagolitic-title {
		color: #ffffff;
	}

	:global(body.dark-mode) .latin-title {
		color: rgba(255, 255, 255, 0.6);
	}

	.header-actions {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.separator {
		width: 1px;
		height: 24px;
		background: rgba(0, 0, 0, 0.15);
		margin: 0 4px;
	}

	:global(body.dark-mode) .separator {
		background: rgba(255, 255, 255, 0.15);
	}

	.icon-btn {
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 10px;
		padding: 8px;
		cursor: pointer;
		color: #000000;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-btn:hover {
		background: rgba(0, 0, 0, 0.05);
		transform: scale(1.05);
	}

	.icon-btn:active {
		transform: scale(0.95);
	}

	:global(body.dark-mode) .icon-btn {
		border-color: rgba(255, 255, 255, 0.15);
		color: #ffffff;
	}

	:global(body.dark-mode) .icon-btn:hover {
		background: rgba(255, 255, 255, 0.1);
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
		background: transparent;
		border-radius: 16px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	:global(body.dark-mode) .panel {
		border-color: rgba(255, 255, 255, 0.1);
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		background: rgba(0, 0, 0, 0.02);
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	:global(body.dark-mode) .panel-header {
		background: rgba(255, 255, 255, 0.03);
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.lang-select {
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		padding: 8px 12px;
		color: #000000;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		outline: none;
		transition: all 0.2s ease;
	}

	.lang-select:hover {
		background: rgba(0, 0, 0, 0.03);
	}

	:global(body.dark-mode) .lang-select {
		border-color: rgba(255, 255, 255, 0.15);
		color: #ffffff;
	}

	:global(body.dark-mode) .lang-select:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.lang-select option {
		background: #ffffff;
		color: #000000;
	}

	:global(body.dark-mode) .lang-select option {
		background: #2c2c2c;
		color: #ffffff;
	}

	.char-count {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.5);
		font-weight: 500;
	}

	:global(body.dark-mode) .char-count {
		color: rgba(255, 255, 255, 0.5);
	}

	.copy-btn {
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		padding: 6px 12px;
		color: #000000;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		transition: all 0.2s ease;
	}

	.copy-btn:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.copy-btn:active {
		transform: scale(0.98);
	}

	:global(body.dark-mode) .copy-btn {
		border-color: rgba(255, 255, 255, 0.15);
		color: #ffffff;
	}

	:global(body.dark-mode) .copy-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	textarea {
		flex: 1;
		background: transparent;
		border: none;
		padding: 20px;
		color: #000000;
		font-size: var(--text-font-size, 18px);
		line-height: 1.6;
		resize: none;
		outline: none;
		font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
		direction: ltr;
	}

	:global(textarea[dir="rtl"]) {
		direction: rtl;
	}

	textarea::placeholder {
		color: rgba(0, 0, 0, 0.3);
	}

	:global(body.dark-mode) textarea {
		color: #ffffff;
	}

	:global(body.dark-mode) textarea::placeholder {
		color: rgba(255, 255, 255, 0.3);
	}

	textarea#output {
		background: rgba(0, 0, 0, 0.02);
	}

	:global(body.dark-mode) textarea#output {
		background: rgba(255, 255, 255, 0.03);
	}

	/* Footer */
	.footer {
		background: transparent;
		border-radius: 12px;
		padding: 12px 20px;
	}

	.shortcuts {
		display: flex;
		gap: 20px;
		justify-content: center;
		align-items: center;
	}

	.separator-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.3);
	}

	:global(body.dark-mode) .separator-dot {
		background: rgba(255, 255, 255, 0.3);
	}

	.shortcut {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.5);
	}

	:global(body.dark-mode) .shortcut {
		color: rgba(255, 255, 255, 0.5);
	}

	kbd {
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		padding: 4px 8px;
		font-size: 11px;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		color: #000000;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	:global(body.dark-mode) kbd {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.1);
		color: #ffffff;
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
