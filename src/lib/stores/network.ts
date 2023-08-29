import { writable } from 'svelte/store';

export const online = writable(navigator.onLine);

window.addEventListener('online', () => online.set(true));
window.addEventListener('offline', () => online.set(false));
