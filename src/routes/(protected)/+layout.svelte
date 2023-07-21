<script>
	import { goto } from '$app/navigation';
	import '$lib/app.css';
	import Menu from '$lib/components/Menu.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	function logout() {
		localStorage.clear();
		goto('/login');
	}
</script>

<Menu />

<div class="min-h-screen bg-gray-100 pb-12">
	<div class="flex items-center justify-between p-3">
		<PageTitle />
		<button class="bg-white shadow-lg px-3 py-1 rounded" on:click={logout}> Logout </button>
	</div>

	<div class="px-3 pt-2">
		<slot />
	</div>
</div>
