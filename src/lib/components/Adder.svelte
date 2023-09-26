<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let qty = 1;
	export let qtySaved = 0;
	export let disabled = false;
</script>

<div class="flex justify-between gap-2">
	<form
		on:submit|preventDefault={() => !disabled && dispatch('add')}
		class="flex shadow-lg rounded overflow-hidden"
	>
		<Button type="submit" class="shrink-0 rounded-r-none bg-neutral-800 text-white" {disabled}>
			Add{disabled ? 'ing...' : ''}
		</Button>
		<input
			type="number"
			class="w-24 px-1 pr-2 text-right dark:bg-neutral-700 focus:outline-none disabled:bg-neutral-200 disabled:cursor-not-allowed"
			bind:value={qty}
			aria-label="quantity"
			{disabled}
		/>
	</form>
	<Button on:click={() => dispatch('clear')}>
		Clear {Intl.NumberFormat().format(qtySaved)}
	</Button>
</div>
