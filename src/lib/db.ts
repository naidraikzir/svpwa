import Dexie, { type Table } from 'dexie';

export interface ListItem {
	id?: number;
	name: string;
	email: string;
	birthdate: Date;
}

export class SubDexie extends Dexie {
	list!: Table<ListItem>;

	constructor() {
		super('db');
		this.version(1).stores({
			list: '++id, name, email, birthdate'
		});
	}
}

export const db = new SubDexie();
