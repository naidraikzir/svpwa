import * as Comlink from 'comlink';

async function create(qty: number, creator: () => object): Promise<Uint8Array> {
	const results = await Promise.all(Array.from(Array(qty)).map(creator));
	const encoder = new TextEncoder();
	const buffer = encoder.encode(JSON.stringify(results));
	return Comlink.transfer(buffer, [buffer.buffer]);
}

Comlink.expose({ create });
