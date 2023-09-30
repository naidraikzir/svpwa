<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let qty = 1;
	export let qtySaved = 0;
	export let disabled = false;
</script>

<div class="flex flex-wrap justify-between gap-2">
	<form
		on:submit|preventDefault={() => !disabled && dispatch('add')}
		class="flex shadow-lg rounded overflow-hidden"
	>
		<Button type="submit" class="shrink-0 rounded-r-none bg-neutral-800 text-white" {disabled}>
			Add
		</Button>
		<input
			type="number"
			class="
				w-20 px-1 pr-2 text-right dark:bg-neutral-700 focus:outline-none
				disabled:bg-neutral-200 disabled:cursor-not-allowed
				[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
				[&::-webkit-inner-spin-button]:appearance-none
			"
			bind:value={qty}
			aria-label="quantity"
			{disabled}
		/>
	</form>
	<Button on:click={() => dispatch('clear')} {disabled}>
		Clear {Intl.NumberFormat().format(qtySaved)}
	</Button>
</div>
