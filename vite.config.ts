import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [sveltekit(), Icons({ compiler: 'svelte' })],
	define: {
		'process.env.NODE_ENV': '"production"',
		'process.env.HOMEPAGE': JSON.stringify(process.env.npm_package_homepage)
	}
});
