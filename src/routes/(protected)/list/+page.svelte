<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import listStore, { add, clear } from '$lib/stores/list';
	import VirtualScrollNavigation from '$lib/components/VirtualScrollNavigation.svelte';

	const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: 'long' });
	let vs: SvelteComponent;
	let qty = 1;
	let loading = false;

	async function addItems() {
		if (loading) return;
		loading = true;
		await add(qty);
		loading = false;
	}
</script>

<DocumentHead title="List" description="List Example" />

<Adder
	on:add={addItems}
	on:clear={clear}
	bind:qty
	qtySaved={$listStore.length}
	disabled={loading}
/>

<VirtualScrollNavigation {vs} max={$listStore.length} />

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
