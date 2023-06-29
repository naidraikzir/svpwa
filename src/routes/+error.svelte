<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="text-3xl lg:text-4xl pt-3 font-semibold">{$page.status}</h1>
<div>{$page.error?.message}</div>
<a href="/" class="inline-block mt-4">← Back</a>
