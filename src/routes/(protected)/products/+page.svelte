<script lang="ts">
	import debounce from 'debounce';
	import type { SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import VirtualScrollNavigation from '$lib/components/VirtualScrollNavigation.svelte';
	import productsStore, { fetch, clear } from '$lib/stores/products';

	let vs: SvelteComponent;
</script>

<DocumentHead title="Products" description="List of Products" />

<div class="flex justify-end gap-2">
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={clear}>
		Clear {Intl.NumberFormat().format($productsStore.length)}
	</button>
</div>

<VirtualScrollNavigation {vs} max={$productsStore.length} />

<div class="mt-4">
	{#if !$productsStore.length}
		<div class="flex items-center justify-center py-12">
			<button class="bg-white shadow-lg rounded px-3 py-1" on:click={fetch}>Get Products</button>
		</div>
	{:else}
		<div class="text-xs">
			<VirtualScroll
				data={$productsStore}
				key="id"
				pageMode
				bind:this={vs}
				let:data
				on:bottom={debounce(fetch, 500)}
			>
				<div class="flex py-3">
					<div class="w-16 h-16 shrink-0 pt-1">
						<img src={data.thumbnail} alt={data.title} class="w-full max-h-full rounded" />
					</div>
					<div class="ml-4">
						<div class="text-lg font-semibold leading-tight mb-1">{data.title}</div>
						<div class="mb-2">
							<span class="bg-black text-white rounded shadow px-1 py-0.5">${data.price}</span>
						</div>
						<div>{data.description}</div>
					</div>
				</div>
			</VirtualScroll>
		</div>
	{/if}
</div>