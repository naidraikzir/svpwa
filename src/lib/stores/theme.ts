import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const stored = browser
	? localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark')
	: undefined;

export const theme = writable(<Theme>stored);

theme.subscribe((value) => {
	if (browser) {
		localStorage.theme = value;
		document.documentElement.removeAttribute('class');
		document.documentElement.classList.add(value);
	}
});
