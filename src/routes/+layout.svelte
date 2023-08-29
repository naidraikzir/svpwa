<script lang="ts">
	import '$lib/app.css';
	import NetworkStatus from '$lib/components/NetworkStatus.svelte';
	import { online } from '$lib/stores/network';

	let status = !$online;
</script>

<NetworkStatus on:shown={(e) => (status = e.detail)} />

<div class="transition-all" class:pt-5={status}>
	<slot />
</div>
