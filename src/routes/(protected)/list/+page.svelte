<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import listStore, { add, clear, isBusy } from '$lib/stores/list';
	import VirtualScrollNavigation from '$lib/components/VirtualScrollNavigation.svelte';

	const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: 'long' });
	let vs: SvelteComponent;
	let qty = 1;
</script>

<DocumentHead title="List" description="List Example" />

<Adder
	on:add={() => add(qty)}
	on:clear={clear}
	bind:qty
	qtySaved={$listStore.length}
	disabled={$isBusy}
/>

<VirtualScrollNavigation {vs} max={$listStore.length} />

<div class="mt-4">
	{#if !$listStore.length}
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
