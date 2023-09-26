<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let classNames = '';
	export { classNames as class };

	const dispatch = createEventDispatcher();
</script>

<button
	class={twMerge(
		'bg-white dark:bg-neutral-800 shadow-lg px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed',
		classNames
	)}
	on:click={() => dispatch('click')}
	{...$$restProps}
>
	<slot />
</button>
