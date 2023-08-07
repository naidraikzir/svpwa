import * as Comlink from 'comlink';

async function create(qty: number, creator: () => object): Promise<Uint8Array> {
	const results = await Promise.all(Array.from(Array(qty)).map(creator));
	const encoder = new TextEncoder();
	const arr = encoder.encode(JSON.stringify(results));
	return Comlink.transfer(arr, [arr.buffer]);
}

Comlink.expose({ create });
