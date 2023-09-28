<script lang="ts">
	import { Github } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Menu from '$lib/components/Menu.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Themer from '$lib/components/Themer.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;

	function logout() {
		localStorage.clear();
		goto('/login');
	}
</script>

<Menu />

<div class="min-h-screen pb-12">
	<div class="flex items-center justify-between p-3 gap-4">
		<PageTitle />
		<a
			href={process.env.HOMEPAGE}
			class="h-6 w-6 ml-auto"
			target="_blank"
			rel="noreferrer"
			aria-label="Repository"
		>
			<Github />
		</a>
		<Themer />
		<Button on:click={logout}>Logout</Button>
	</div>

	{#key data.pathname}
		<div class="px-3" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/key}
</div>
