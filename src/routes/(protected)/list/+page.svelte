<script lang="ts">
	import { randFullName, randEmail, randPastDate } from '@ngneat/falso';
	import type { SvelteComponent } from 'svelte';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import Adder from '$lib/components/Adder.svelte';
	import { listStore } from '$lib/stores/list';

	let vs: SvelteComponent;
	let qty = 1;
	let scrollTo = 0;

	function add() {
		listStore.add(
			Array.from(Array(qty)).map(() => ({
				name: randFullName(),
				email: randEmail(),
				birthdate: randPastDate()
			}))
		);
	}
</script>

<DocumentHead title="List" description="List Example" />

<Adder {add} bind:qty store={listStore} />

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
	{#await listStore.init()}
		<div>Loading...</div>
	{:then}
		{#if !$listStore.length}
			<div>Empty 🤷‍♂️</div>
		{/if}

		<div class="text-xs">
			<VirtualScroll data={$listStore} key="email" pageMode bind:this={vs} let:data>
				<div class="py-2">
					<div class="text-lg font-semibold">{data.name}</div>
					<div>{data.email}</div>
					<div>
						{Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(data.birthdate)}
					</div>
				</div>
			</VirtualScroll>
		</div>
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
