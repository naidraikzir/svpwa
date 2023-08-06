import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { randFullName, randEmail, randBetweenDate } from '@ngneat/falso';
import * as Comlink from 'comlink';
import { writable } from 'svelte/store';
import { createWorker } from '$lib/utils';

export type ListItem = {
	name: string;
	email: string;
	birthdate: Date;
};

const store = persist(writable<ListItem[]>([]), createIndexedDBStorage(), 'list');

export async function add(qty: number) {
	const worker = await createWorker();
	const results = await worker.create(
		qty,
		Comlink.proxy(() => ({
			name: randFullName(),
			email: randEmail(),
			birthdate: randBetweenDate({
				from: new Date('01/01/1970'),
				to: new Date('12/31/2000')
			})
		}))
	);
	const decoder = new TextDecoder();
	const json = decoder.decode(results);
	store.update((value) => [...value, ...JSON.parse(json)]);
}

export async function clear() {
	store.update(() => []);
}

export default store;
