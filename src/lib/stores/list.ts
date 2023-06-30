import { del, get, update } from 'idb-keyval';
import { writable } from 'svelte/store';

const STORE_NAME = 'list';

export type ListItem = {
	name: string;
	email: string;
	birthdate: Date;
};

function createListStore() {
	const store = writable<ListItem[]>([]);

	return {
		...store,
		async init() {
			const val = await get(STORE_NAME);
			store.set(val || []);
		},
		async add(newItems: ListItem[]) {
			await update(STORE_NAME, (val = []) => [...newItems, ...val]);
			this.init();
		},
		async clear() {
			await del(STORE_NAME);
			store.set([]);
		}
	};
}

export const listStore = createListStore();
