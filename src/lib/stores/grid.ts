import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export type GridItem = {
	fullName: string;
	brand: string;
	validFrom: string;
	untilEnd: string;
	ccv: string;
	number: string;
	account: string;
	type: string;
};

const store = persist(writable<GridItem[]>([]), createIndexedDBStorage(), 'grid');

export default store;
