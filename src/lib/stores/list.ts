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
export const isBusy = writable(false);

export async function add(qty: number) {
	isBusy.set(true);
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
	const str = decoder.decode(results);
	store.update((value) => [...value, ...JSON.parse(str)]);
	isBusy.set(false);
}

export async function clear() {
	store.update(() => []);
}

export default store;
