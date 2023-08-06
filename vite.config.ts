import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env.NODE_ENV': '"production"',
		'process.env.HOMEPAGE': JSON.stringify(process.env.npm_package_homepage)
	}
});
