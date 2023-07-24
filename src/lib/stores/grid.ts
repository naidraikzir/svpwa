import { del, get, update } from 'idb-keyval';
import { writable } from 'svelte/store';

const STORE_NAME = 'grid';

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

function createGridStore() {
	const store = writable([]);

	return {
		...store,
		async init() {
			const val = await get(STORE_NAME);
			store.set(val || []);
		},
		async add(newItems: GridItem[]) {
			await update(STORE_NAME, (val = []) => [...newItems, ...val]);
			this.init();
		},
		async clear() {
			await del(STORE_NAME);
			store.set([]);
		}
	};
}

export const gridStore = createGridStore();
