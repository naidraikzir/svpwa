<script lang="ts">
	import menu from '$lib/menu';
</script>

<div class="group/menu">
	<button
		class="
            fixed z-10 bottom-2 lg:bottom-4 right-2 lg:right-4 w-10 h-10 text-4xl
            flex items-center justify-center bg-white shadow-lg rounded
        "
	>
		⦿
	</button>

	<div
		class="
            fixed z-10 bottom-2 lg:bottom-4 right-2 lg:right-4 mb-10 pb-2 flex flex-col-reverse items-end gap-2
            transition-all invisible opacity-0 group-hover/menu:visible group-hover/menu:opacity-100
        "
	>
		{#each menu as { name, path }, m}
			<a
				class="
					bg-white shadow-lg px-3 py-1 rounded transition duration-300
					opacity-0 group-hover/menu:opacity-100 translate-y-2 group-hover/menu:translate-y-0
				"
				href={path}
				style="transition-delay: {m * 0.1}s;"
			>
				{name}
			</a>
		{/each}
	</div>
</div>
