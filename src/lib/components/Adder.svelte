<script lang="ts">
	import type { ListStore } from '$lib/types/ListStore';

	export let add = (): void => undefined;
	export let qty = 1;
	export let store: ListStore;
</script>

<div class="flex justify-between gap-2">
	<form on:submit|preventDefault={add} class="flex bg-white shadow-lg rounded">
		<button type="submit" class="bg-black text-white rounded-l px-3 py-1">Add</button>
		<input
			type="number"
			class="w-16 border-x px-1 text-right focus:outline-none"
			bind:value={qty}
			aria-label="quantity"
		/>
		<span class="px-3 py-1">Items</span>
	</form>
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={store.clear}>
		Clear {Intl.NumberFormat().format($store.length)}
	</button>
</div>
