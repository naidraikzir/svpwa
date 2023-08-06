<script lang="ts">
	import type { ColDef } from 'ag-grid-community';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import AgGrid from '$lib/components/Grid/AgGrid.svelte';
	import gridStore, { add, clear } from '$lib/stores/grid';

	let qty = 1;
	let loading = false;

	const columnDefs: ColDef[] = [
		{ field: 'fullName', pinned: 'left', width: 150 },
		{ field: 'brand', width: 150 },
		{ field: 'untilEnd', width: 120, type: 'rightAligned' },
		{ field: 'number', width: 200 },
		{ field: 'type' }
	];

	async function addItems() {
		loading = true;
		await add(qty);
		loading = false;
	}

	$: rowData = $gridStore as [];
</script>

<DocumentHead title="Grid" description="Grid Example" />

<Adder
	on:add={addItems}
	on:clear={clear}
	bind:qty
	qtySaved={$gridStore.length}
	disabled={loading}
/>

<div class="mt-4">
	<div class="h-[600px]">
		<AgGrid {rowData} {columnDefs} />
	</div>
</div>
