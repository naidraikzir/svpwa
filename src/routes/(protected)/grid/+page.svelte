<script lang="ts">
	import type { ColDef } from 'ag-grid-community';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import AgGrid from '$lib/components/Grid/AgGrid.svelte';
	import gridStore, { add, clear, isBusy } from '$lib/stores/grid';

	let qty = 1;

	const columnDefs: ColDef[] = [
		{ field: 'fullName', width: 200 },
		{ field: 'brand', width: 150 },
		{ field: 'untilEnd', width: 120, type: 'rightAligned' },
		{ field: 'number', width: 200 },
		{ field: 'type' }
	];

	$: rowData = $gridStore as [];
</script>

<DocumentHead title="Grid" description="Grid Example" />

<Adder
	on:add={() => add(qty)}
	on:clear={clear}
	bind:qty
	qtySaved={$gridStore.length}
	disabled={$isBusy}
/>

<div class="mt-4">
	<div class="h-[calc(100vh-11em)]">
		<AgGrid {rowData} {columnDefs} />
	</div>
</div>
