import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { randCreditCard } from '@ngneat/falso';
import * as Comlink from 'comlink';
import { writable } from 'svelte/store';
import { createWorker } from '$lib/utils';

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
export const isBusy = writable(false);

export async function add(qty: number) {
	isBusy.set(true);
	const worker = await createWorker();
	const results = await worker.create(qty, Comlink.proxy(randCreditCard));
	const decoder = new TextDecoder();
	const str = decoder.decode(results);
	store.update((value) => [...value, ...JSON.parse(str)]);
	isBusy.set(false);
}

export async function clear() {
	store.update(() => []);
}

export default store;
