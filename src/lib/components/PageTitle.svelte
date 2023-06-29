<script>
	import { page } from '$app/stores';
	import menu from '$lib/menu';

	$: currentPageName = menu.find(
		({ path }) => path === `/${$page.url.pathname.split('/')[1]}`
	)?.name;
</script>

{#if currentPageName}
	<h1 class="text-3xl lg:text-4xl p-3 font-semibold">{currentPageName}</h1>
{/if}
