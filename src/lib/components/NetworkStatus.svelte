<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { online } from '$lib/stores/network';

	const dispatch = createEventDispatcher();
	let shown = !$online;

	$: if ($online) {
		setTimeout(() => {
			shown = false;
		}, 2000);
	} else {
		shown = true;
	}
	$: dispatch('shown', shown);
</script>

<div
	class="
        fixed inset-x-0 top-0 text-sm text-center text-white overflow-hidden transition-all
        {shown ? 'max-h-6' : 'max-h-0'}
    "
>
	{#if $online}
		<div class="bg-green-500">Back online</div>
	{:else}
		<div class="bg-red-500">You are offline</div>
	{/if}
</div>
