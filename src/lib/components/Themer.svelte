<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';

	function toggle() {
		$theme = isDark ? 'light' : 'dark';
	}

	$: isDark = $theme === 'dark';
	$: Icon = isDark ? Moon : Sun;
</script>

<button
	class="w-6 h-6 flex items-center justify-center text-xl"
	on:click={toggle}
	aria-label="toggle theme"
>
	<svelte:component this={Icon} />
</button>
