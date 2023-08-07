<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let online = navigator.onLine;
	let shown = !navigator.onLine;

	function setOnline() {
		online = navigator.onLine;
		shown = true;
		if (online) {
			setTimeout(() => {
				shown = false;
			}, 2000);
		}
	}

	window.addEventListener('online', setOnline);
	window.addEventListener('offline', setOnline);

	$: dispatch('shown', shown);
</script>

<div
	class="
        fixed inset-x-0 top-0 text-sm text-center text-white overflow-hidden transition-all
        {shown ? 'max-h-6' : 'max-h-0'}
    "
>
	{#if online}
		<div class="bg-green-500">Back online</div>
	{:else}
		<div class="bg-red-500">You are offline</div>
	{/if}
</div>
