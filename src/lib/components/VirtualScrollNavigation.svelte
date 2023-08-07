<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let vs: SvelteComponent;
	export let max = 0;
	let target = 0;
</script>

<div class="flex justify-between mt-4 sticky top-4">
	<form on:submit|preventDefault={vs.scrollToIndex(target)} class="flex bg-white shadow-lg rounded">
		<button type="submit" class="bg-black text-white rounded-l px-3 py-1">Scroll To</button>
		<input
			type="number"
			class="w-16 border-x px-1 text-right focus:outline-none rounded-r"
			bind:value={target}
			{max}
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
