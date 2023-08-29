import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import axios from 'axios';
import { writable, get } from 'svelte/store';
import { online } from './network';

export type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
};

const store = persist(writable<Product[]>([]), createIndexedDBStorage(), 'products');
export const isBusy = writable(false);

export async function fetch() {
	if (!get(online) || get(isBusy)) return;
	isBusy.set(true);
	const { data } = await axios.get(
		`https://dummyjson.com/products?limit=10&skip=${get(store).length}`
	);
	store.update((value) => [...value, ...data.products]);
	isBusy.set(false);
}

export async function clear() {
	store.update(() => []);
}

export default store;
