import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export type ListItem = {
	name: string;
	email: string;
	birthdate: Date;
};

const store = persist(writable<ListItem[]>([]), createIndexedDBStorage(), 'list');

export default store;
