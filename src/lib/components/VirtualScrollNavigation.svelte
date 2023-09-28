<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import Button from './Button.svelte';

	export let vs: SvelteComponent;
	export let max = 0;
	let target = 0;
</script>

<div class="flex flex-wrap justify-between gap-2 mt-4 sticky top-4 z-10">
	<form on:submit|preventDefault={vs.scrollToIndex(target)} class="flex shadow-lg rounded">
		<Button type="submit" class="rounded-r-none bg-neutral-800 text-white">Scroll To</Button>
		<input
			type="number"
			class="
				w-20 px-1 text-right focus:outline-none rounded-r dark:bg-neutral-700
				[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
				[&::-webkit-inner-spin-button]:appearance-none
			"
			bind:value={target}
			{max}
			aria-label="index to scroll to"
		/>
	</form>
	<Button on:click={vs.scrollToOffset(0)}>To Top</Button>
	<Button on:click={vs.scrollToBottom()}>To Bottom</Button>
</div>
