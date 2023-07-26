<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let qty = 1;
	export let qtySaved = 0;
</script>

<div class="flex justify-between gap-2">
	<form on:submit|preventDefault={() => dispatch('add')} class="flex bg-white shadow-lg rounded">
		<button type="submit" class="bg-black text-white rounded-l px-3 py-1">Add</button>
		<input
			type="number"
			class="w-16 border-x px-1 text-right focus:outline-none"
			bind:value={qty}
			aria-label="quantity"
		/>
		<span class="px-3 py-1">Items</span>
	</form>
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={() => dispatch('clear')}>
		Clear {Intl.NumberFormat().format(qtySaved)}
	</button>
</div>
