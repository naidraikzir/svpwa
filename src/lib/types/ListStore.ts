import type { Writable } from 'svelte/store';

export type ListStore = Writable<Array<object>> & {
	init(): Promise<void>;
	add(newItems: object[]): Promise<void>;
	clear(): Promise<void>;
};
