<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import { Circle, Line } from '$lib/components/Loader';
	import VirtualScrollNavigation from '$lib/components/VirtualScrollNavigation.svelte';
	import productsStore, { fetch, clear, isBusy } from '$lib/stores/products';
	import Button from '$lib/components/Button.svelte';

	let vs: SvelteComponent;

	function onImgError(e: Event) {
		(e.target as HTMLImageElement).src = '/favicon.png';
	}
</script>

<DocumentHead title="Products" description="List of Products" />

<div class="flex justify-end gap-2">
	<Button on:click={clear}>
		Clear {Intl.NumberFormat().format($productsStore.length)}
	</Button>
</div>

<VirtualScrollNavigation {vs} max={$productsStore.length} />

<div class="mt-4">
	{#if !$productsStore.length && !$isBusy}
		<div class="flex items-center justify-center py-12">
			<Button on:click={fetch}>Get Products</Button>
		</div>
	{:else}
		<div class="text-xs">
			<VirtualScroll
				data={$productsStore}
				key="id"
				bottomThreshold={200}
				pageMode
				bind:this={vs}
				let:data
				on:bottom={fetch}
			>
				<div class="relative flex py-3">
					<div
						class="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 text-5xl font-bold font-mono dark:text-white"
					>
						{data.id}
					</div>
					<div class="w-16 h-16 shrink-0 pt-1">
						<img
							src={data.thumbnail}
							alt={data.title}
							class="w-full max-h-full rounded"
							on:error={onImgError}
						/>
					</div>
					<div class="ml-4">
						<div class="text-lg font-semibold leading-tight mb-1">{data.title}</div>
						<div class="mb-2">
							<span class="bg-black dark:bg-neutral-700 text-white rounded shadow px-1 py-0.5">
								${data.price}
							</span>
						</div>
						<div>{data.description}</div>
					</div>
				</div>
			</VirtualScroll>
		</div>
	{/if}

	{#if $isBusy}
		<div class="flex gap-2 py-3">
			<div class="shrink-0">
				<Circle size={75} />
			</div>
			<div class="flex flex-col gap-2">
				<Line size={120} />
				<Line />
				<Line size={200} />
			</div>
		</div>
	{/if}
</div>
