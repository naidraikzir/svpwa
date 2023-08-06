<script lang="ts">
	import { randFullName, randEmail, randBetweenDate } from '@ngneat/falso';
	import * as Comlink from 'comlink';
	import { onMount, type SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import Adder from '$lib/components/Adder.svelte';
	import listStore from '$lib/stores/list';

	const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: 'long' });
	let vs: SvelteComponent;
	let qty = 1;
	let scrollTo = 0;
	let loading = false;
	let worker: Comlink.Remote<{
		create: (qty: number, creator: () => object) => Promise<Uint8Array>;
	}>;

	onMount(initWorker);

	async function initWorker() {
		const Worker = (await import('$lib/creator.worker?worker')).default;
		worker = Comlink.wrap(new Worker());
	}

	async function add() {
		if (loading) return;

		loading = true;
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
		const json = decoder.decode(results);
		$listStore = [...$listStore, ...JSON.parse(json)];
		loading = false;
	}

	function clear() {
		$listStore = [];
	}
</script>

<DocumentHead title="List" description="List Example" />

<Adder on:add={add} on:clear={clear} bind:qty qtySaved={$listStore.length} disabled={loading} />

<div class="flex justify-between mt-4 sticky top-4">
	<form
		on:submit|preventDefault={vs.scrollToIndex(scrollTo)}
		class="flex bg-white shadow-lg rounded"
	>
		<button type="submit" class="bg-black text-white rounded-l px-3 py-1">Scroll To</button>
		<input
			type="number"
			class="w-16 border-x px-1 text-right focus:outline-none rounded-r"
			bind:value={scrollTo}
			max={$listStore.length}
			aria-label="index to scroll to"
		/>
	</form>
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={vs.scrollToOffset(0)}>
		To Top
	</button>
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={vs.scrollToBottom()}>
		To Bottom
	</button>
</div>

<div class="mt-4">
	{#if loading}
		<div>Loading...</div>
	{:else if !$listStore.length}
		<div>Empty 🤷‍♂️</div>
	{/if}

	<div class="text-xs">
		<VirtualScroll data={$listStore} key="email" pageMode bind:this={vs} let:data>
			<div class="py-2">
				<div class="text-lg font-semibold">{data.name}</div>
				<div>{data.email}</div>
				<div>
					{dateFormatter.format(new Date(data.birthdate))}
				</div>
			</div>
		</VirtualScroll>
	</div>
</div>
