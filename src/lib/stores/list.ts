import { db } from '$lib/db';
import { randBetweenDate, randEmail, randFullName } from '@ngneat/falso';
import Dexie, { liveQuery } from 'dexie';
import { writable, get } from 'svelte/store';

export type ListItem = {
	name: string;
	email: string;
	birthdate: Date;
};

export const store = writable<ListItem[]>([]);
export const count = liveQuery(() => db.list.count());
export const isBusy = writable(false);

export async function list() {
	const items = await db.list.reverse().offset(get(store).length).limit(100).toArray();
	store.update((store: ListItem[]) => [...store, ...items]);
}

export async function add(qty: number) {
	isBusy.set(true);
	setTimeout(async () => {
		try {
			const items = [];
			for (let i = 0; i < qty; i++) {
				items.push({
					name: randFullName(),
					email: randEmail(),
					birthdate: randBetweenDate({
						from: new Date('01/01/1970'),
						to: new Date('12/31/2000')
					})
				});
			}
			await db.list.bulkAdd(items);
			store.set([]);
			list();
		} catch (error) {
			const err = new Dexie.BulkError(error as string);
			console.error(err);
		} finally {
			isBusy.set(false);
		}
	});
}

export async function clear() {
	isBusy.set(true);
	await db.list.clear();
	store.set([]);
	isBusy.set(false);
}
