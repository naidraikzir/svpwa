<script>
	import { goto } from '$app/navigation';
	import GithubMark from '$lib/components/GithubMark.svelte';
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
		<a
			href={process.env.HOMEPAGE}
			class="h-6 w-6 ml-auto mr-4 mt-0.5"
			target="_blank"
			rel="noreferrer"
		>
			<GithubMark />
		</a>
		<button class="bg-white shadow-lg px-3 py-1 rounded" on:click={logout}> Logout </button>
	</div>

	<div class="px-3">
		<slot />
	</div>
</div>
