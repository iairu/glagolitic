/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Enable CSR for Tauri
		csr: true,
		prerender: false,
		ssr: false
	}
};

export default config;
