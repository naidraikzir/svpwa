<script lang="ts">
	import { page } from '$app/stores';
	import menu from '$lib/menu';
	import GanttChart from '~icons/lucide/gantt-chart';
	import Button from './Button.svelte';
</script>

<div class="group/menu">
	<Button
		class="
            fixed z-10 bottom-3 lg:bottom-4 right-3 lg:right-4 w-10 h-10 p-0 text-xl
            flex items-center justify-center
        "
	>
		<GanttChart />
	</Button>

	<div
		class="
            fixed z-10 bottom-3 lg:bottom-4 right-3 lg:right-4 mb-10 pb-2 flex flex-col-reverse items-end gap-2
            transition-all invisible opacity-0 group-hover/menu:visible group-hover/menu:opacity-100
        "
	>
		{#each menu as { name, path }, m}
			<a
				class="
					bg-white dark:bg-neutral-800 shadow-lg px-3 py-1 rounded transition duration-300
					opacity-0 group-hover/menu:opacity-100 translate-y-2 group-hover/menu:translate-y-0
				"
				href={path}
				style="transition-delay: {m * 0.1}s;"
			>
				{#if (path !== '/' && $page.url.pathname.startsWith(path)) || (path === '/' && $page.url.pathname === '/')}
					•
				{/if}
				{name}
			</a>
		{/each}
	</div>
</div>
