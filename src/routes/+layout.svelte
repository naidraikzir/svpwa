<script lang="ts">
	import '$lib/app.css';
	import NetworkStatus from '$lib/components/NetworkStatus.svelte';

	let status = !navigator.onLine;
</script>

<NetworkStatus on:shown={(e) => (status = e.detail)} />

<div class:pt-5={status}>
	<slot />
</div>
