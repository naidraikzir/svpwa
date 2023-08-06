<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let qty = 1;
	export let qtySaved = 0;
	export let disabled = false;
</script>

<div class="flex justify-between gap-2">
	<form on:submit|preventDefault={() => dispatch('add')} class="flex bg-white shadow-lg rounded">
		<button
			type="submit"
			class="bg-black text-white rounded-l px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
			{disabled}>Add</button
		>
		<input
			type="number"
			class="w-24 border-x px-1 text-right focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
			bind:value={qty}
			aria-label="quantity"
			{disabled}
		/>
		<span class="px-3 py-1">Items</span>
	</form>
	<button class="bg-white shadow-lg rounded px-3 py-1" on:click={() => dispatch('clear')}>
		Clear {Intl.NumberFormat().format(qtySaved)}
	</button>
</div>
