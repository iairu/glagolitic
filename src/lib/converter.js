/**
 * Glagolitic-Latin Converter
 * Maps between Latin script and Glagolitic script
 */

const latinToGlagoliticMap = {
	// Uppercase
	'A': 'Ⰰ', 'B': 'Ⰱ', 'V': 'Ⰲ', 'G': 'Ⰳ', 'D': 'Ⰴ',
	'E': 'Ⰵ', 'Ž': 'Ⰶ', 'Z': 'Ⰷ', 'I': 'Ⰹ', 'J': 'Ⰺ',
	'K': 'Ⰽ', 'L': 'Ⰾ', 'M': 'Ⰿ', 'N': 'Ⱀ', 'O': 'Ⱁ',
	'P': 'Ⱂ', 'R': 'Ⱃ', 'S': 'Ⱄ', 'T': 'Ⱅ', 'U': 'Ⱆ',
	'F': 'Ⱇ', 'H': 'Ⱈ', 'C': 'Ⱌ', 'Č': 'Ⱍ', 'Š': 'Ⱎ',
	'Y': 'Ⱏ', 'Ě': 'Ⱑ', 'Ę': 'Ⱗ', 'Ū': 'Ⱚ', 'Ŏ': 'Ⱛ',
	// Lowercase
	'a': 'ⰰ', 'b': 'ⰱ', 'v': 'ⰲ', 'g': 'ⰳ', 'd': 'ⰴ',
	'e': 'ⰵ', 'ž': 'ⰶ', 'z': 'ⰷ', 'i': 'ⰹ', 'j': 'ⰺ',
	'k': 'ⰽ', 'l': 'ⰾ', 'm': 'ⰿ', 'n': 'ⱀ', 'o': 'ⱁ',
	'p': 'ⱂ', 'r': 'ⱃ', 's': 'ⱄ', 't': 'ⱅ', 'u': 'ⱆ',
	'f': 'ⱇ', 'h': 'ⱈ', 'c': 'ⱌ', 'č': 'ⱍ', 'š': 'ⱎ',
	'y': 'ⱏ', 'ě': 'ⱡ', 'ę': 'ⱦ', 'ū': 'Ⱬ', 'ŏ': 'ⱬ'
};

const glagoliticToLatinMap = {
	// Uppercase
	'Ⰰ': 'A', 'Ⰱ': 'B', 'Ⰲ': 'V', 'Ⰳ': 'G', 'Ⰴ': 'D',
	'Ⰵ': 'E', 'Ⰶ': 'Ž', 'Ⰷ': 'Z', 'Ⰹ': 'I', 'Ⰺ': 'J',
	'Ⰽ': 'K', 'Ⰾ': 'L', 'Ⰿ': 'M', 'Ⱀ': 'N', 'Ⱁ': 'O',
	'Ⱂ': 'P', 'Ⱃ': 'R', 'Ⱄ': 'S', 'Ⱅ': 'T', 'Ⱆ': 'U',
	'Ⱇ': 'F', 'Ⱈ': 'H', 'Ⱌ': 'C', 'Ⱍ': 'Č', 'Ⱎ': 'Š',
	'Ⱏ': 'Y', 'Ⱑ': 'Ě', 'Ⱗ': 'Ę', 'Ⱚ': 'Ū', 'Ⱛ': 'Ŏ',
	// Lowercase
	'ⰰ': 'a', 'ⰱ': 'b', 'ⰲ': 'v', 'ⰳ': 'g', 'ⰴ': 'd',
	'ⰵ': 'e', 'ⰶ': 'ž', 'ⰷ': 'z', 'ⰹ': 'i', 'ⰺ': 'j',
	'ⰽ': 'k', 'ⰾ': 'l', 'ⰿ': 'm', 'ⱀ': 'n', 'ⱁ': 'o',
	'ⱂ': 'p', 'ⱃ': 'r', 'ⱄ': 's', 'ⱅ': 't', 'ⱆ': 'u',
	'ⱇ': 'f', 'ⱈ': 'h', 'ⱌ': 'c', 'ⱍ': 'č', 'ⱎ': 'š',
	'ⱏ': 'y', 'ⱡ': 'ě', 'ⱦ': 'ę', 'Ⱬ': 'ū', 'ⱬ': 'ŏ'
};

// Simple Syriac (Aramaic) mapping - based on phonetic correspondence
const latinToSyriacMap = {
	// Uppercase
	'A': 'ܐ', 'B': 'ܒ', 'V': 'ܘ', 'G': 'ܓ', 'D': 'ܕ',
	'E': 'ܐ', 'H': 'ܗ', 'Z': 'ܙ', 'K': 'ܟ', 'L': 'ܠ',
	'M': 'ܡ', 'N': 'ܢ', 'S': 'ܣ', 'O': 'ܘ', 'P': 'ܦ',
	'Q': 'ܩ', 'R': 'ܪ', 'SH': 'ܫ', 'T': 'ܛ', 'W': 'ܘ',
	'Y': 'ܝ', 'CH': 'ܚ', 'F': 'ܦ', 'X': 'ܟ', 'J': 'ܓ',
	// Lowercase
	'a': 'ܐ', 'b': 'ܒ', 'v': 'ܘ', 'g': 'ܓ', 'd': 'ܕ',
	'e': 'ܐ', 'h': 'ܗ', 'z': 'ܙ', 'k': 'ܟ', 'l': 'ܠ',
	'm': 'ܡ', 'n': 'ܢ', 's': 'ܣ', 'o': 'ܘ', 'p': 'ܦ',
	'q': 'ܩ', 'r': 'ܪ', 'sh': 'ܫ', 't': 'ܛ', 'w': 'ܘ',
	'y': 'ܝ', 'ch': 'ܚ', 'f': 'ܦ', 'x': 'ܟ', 'j': 'ܓ',
	// Special characters
	'\'': '\'', ' ': ' '
};

const syriacToLatinMap = {
	// Basic Syriac letters
	'ܐ': 'A', 'ܒ': 'B', 'ܓ': 'G', 'ܕ': 'D', 'ܗ': 'H',
	'ܘ': 'W', 'ܙ': 'Z', 'ܚ': 'CH', 'ܛ': 'T', 'ܝ': 'Y',
	'ܟ': 'K', 'ܠ': 'L', 'ܡ': 'M', 'ܢ': 'N', 'ܣ': 'S',
	'ܦ': 'P', 'ܨ': 'TS', 'ܩ': 'Q', 'ܪ': 'R', 'ܫ': 'SH',
	'ܬ': 'TH', '': ' '
};

/**
 * Convert Latin text to Glagolitic
 * @param {string} text - Latin text to convert
 * @returns {string} - Glagolitic text
 */
export function latinToGlagolitic(text) {
	return text.split('').map(char => {
		return latinToGlagoliticMap[char] || char;
	}).join('');
}

/**
 * Convert Glagolitic text to Latin
 * @param {string} text - Glagolitic text to convert
 * @returns {string} - Latin text
 */
export function glagoliticToLatin(text) {
	return text.split('').map(char => {
		return glagoliticToLatinMap[char] || char;
	}).join('');
}

/**
 * Auto-detect script and convert to the other
 * @param {string} text - Text to convert
 * @returns {string} - Converted text
 */
export function autoConvert(text) {
	const glagoliticPattern = /[\u2C00-\u2C5F]/;

	if (glagoliticPattern.test(text)) {
		return glagoliticToLatin(text);
	}

	return latinToGlagolitic(text);
}

/**
 * Convert Latin text to Syriac
 * @param {string} text - Latin text to convert
 * @returns {string} - Syriac text
 */
export function latinToSyriac(text) {
	// Handle digraphs first (SH, CH, TH, TS)
	let result = text;
	result = result.replace(/SH/g, 'ܫ').replace(/sh/g, 'ܫ');
	result = result.replace(/CH/g, 'ܚ').replace(/ch/g, 'ܚ');
	result = result.replace(/TH/g, 'ܬ').replace(/th/g, 'ܬ');
	result = result.replace(/TS/g, 'ܨ').replace(/ts/g, 'ܨ');
	
	return result.split('').map(char => {
		return latinToSyriacMap[char] || char;
	}).join('');
}

/**
 * Convert Syriac text to Latin
 * @param {string} text - Syriac text to convert
 * @returns {string} - Latin text
 */
export function syriacToLatin(text) {
	return text.split('').map(char => {
		return syriacToLatinMap[char] || char;
	}).join('');
}

/**
 * Detect script type
 * @param {string} text - Text to detect
 * @returns {string} - 'latin', 'glagolitic', 'syriac', or 'unknown'
 */
export function detectScript(text) {
	const glagoliticPattern = /[\u2C00-\u2C5F]/;
	const syriacPattern = /[\u0700-\u074F]/;
	
	if (syriacPattern.test(text)) {
		return 'syriac';
	}
	
	if (glagoliticPattern.test(text)) {
		return 'glagolitic';
	}
	
	return 'latin';
}
