<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import VirtualScrollNavigation from '$lib/components/VirtualScrollNavigation.svelte';
	import { store, isBusy, isClearing, count, list, add, clear } from '$lib/stores/list';

	const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: 'long' });
	let vs: SvelteComponent;
	let qty = 1;

	onMount(list);
</script>

<DocumentHead title="List" description="List Example" />

<Adder
	on:add={() => add(qty)}
	on:clear={clear}
	bind:qty
	qtySaved={$count}
	disabled={$isBusy}
	clearDisabled={$isClearing}
/>

<VirtualScrollNavigation {vs} max={$store.length} />

<div class="mt-4">
	{#if !$store.length}
		<div>Empty 🤷‍♂️</div>
	{/if}

	<div class="text-xs">
		<VirtualScroll
			data={$store}
			key="id"
			bottomThreshold={100}
			pageMode
			bind:this={vs}
			let:data
			on:bottom={list}
		>
			<div class="relative py-2">
				<div
					class="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 text-5xl font-bold font-mono dark:text-white"
				>
					{data.id}
				</div>
				<div class="text-lg font-semibold">{data.name}</div>
				<div>{data.email}</div>
				<div>
					{dateFormatter.format(new Date(data.birthdate))}
				</div>
			</div>
		</VirtualScroll>
	</div>
</div>
