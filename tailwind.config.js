import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['iA Writer Duo', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: []
};
