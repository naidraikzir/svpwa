<script lang="ts">
	import '$lib/app.css';
	import NetworkStatus from '$lib/components/NetworkStatus.svelte';
	import { online } from '$lib/stores/network';

	let status = !$online;
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<NetworkStatus on:shown={(e) => (status = e.detail)} />

<div class="bg-neutral-100 dark:bg-black dark:text-white transition-all" class:pt-5={status}>
	<slot />
</div>
