import * as Comlink from 'comlink';

export async function createWorker(): Promise<
	Comlink.Remote<{
		create: (qty: number, creator: () => object) => Promise<Uint8Array>;
	}>
> {
	const Worker = (await import('$lib/creator.worker?worker')).default;
	return Comlink.wrap(new Worker());
}
