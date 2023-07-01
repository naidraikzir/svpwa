<script lang="ts">
	import { randFullName, randEmail, randPastDate } from '@ngneat/falso';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import { listStore } from '$lib/stores/list';

	let qty = 1;

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

<div class="flex justify-between gap-2">
	<form on:submit|preventDefault={add} class="flex bg-white shadow-lg rounded">
		<button type="submit" class="bg-black text-white rounded-l px-3 py-1">Add</button>
		<input
			type="number"
			class="w-16 border-x px-1 text-right focus:outline-none"
			bind:value={qty}
		/>
		<span class="px-3 py-1">Items</span>
	</form>
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={listStore.clear}>
		Clear {Intl.NumberFormat().format($listStore.length)}
	</button>
</div>

<div class="mt-4">
	{#await listStore.init()}
		<div>Loading...</div>
	{:then}
		{#if !$listStore.length}
			<div>Empty 🤷‍♂️</div>
		{/if}

		<div class="h-[500px] text-xs">
			<VirtualScroll data={$listStore} key="email" let:data>
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
