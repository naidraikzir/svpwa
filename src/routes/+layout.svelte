<script>
	import '@fontsource/ia-writer-duo';
	import '$lib/app.css';
	import Menu from '$lib/components/Menu.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
</script>

<Menu />

<div class="min-h-screen bg-gray-100">
	<PageTitle />

	<div class="px-3">
		<slot />
	</div>
</div>
