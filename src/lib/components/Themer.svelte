<script lang="ts">
	import Moon from '~icons/lucide/moon';
	import Sun from '~icons/lucide/sun';
	import { theme } from '$lib/stores/theme';

	function toggle() {
		$theme = isDark ? 'light' : 'dark';
	}

	$: isDark = $theme === 'dark';
	$: Icon = isDark ? Moon : Sun;
</script>

<button class="w-6 h-6 text-xl" on:click={toggle} aria-label="toggle theme">
	<svelte:component this={Icon} />
</button>
