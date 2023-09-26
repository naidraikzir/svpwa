<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import Button from './Button.svelte';

	export let vs: SvelteComponent;
	export let max = 0;
	let target = 0;
</script>

<div class="flex justify-between mt-4 sticky top-4">
	<form on:submit|preventDefault={vs.scrollToIndex(target)} class="flex shadow-lg rounded">
		<Button type="submit" class="rounded-r-none bg-neutral-800 text-white">Scroll To</Button>
		<input
			type="number"
			class="w-16 px-1 text-right focus:outline-none rounded-r dark:bg-neutral-700"
			bind:value={target}
			{max}
			aria-label="index to scroll to"
		/>
	</form>
	<Button on:click={vs.scrollToOffset(0)}>To Top</Button>
	<Button on:click={vs.scrollToBottom()}>To Bottom</Button>
</div>
