import * as Comlink from 'comlink';

async function create(qty: number, creator: () => object): Promise<Uint8Array> {
	const results = [];
	for (let i = 0; i < qty; i++) {
		results[i] = await creator();
	}
	const encoder = new TextEncoder();
	const arr = encoder.encode(JSON.stringify(results));
	return Comlink.transfer(arr, [arr.buffer]);
}

Comlink.expose({ create });
