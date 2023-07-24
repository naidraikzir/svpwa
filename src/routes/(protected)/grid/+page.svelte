<script lang="ts">
	import { randCreditCard } from '@ngneat/falso';
	import type { ColDef } from 'ag-grid-community';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import AgGrid from '$lib/components/Grid/AgGrid.svelte';
	import { gridStore } from '$lib/stores/grid';

	let qty = 1;

	const columnDefs: ColDef[] = [
		{ field: 'fullName', pinned: 'left', width: 150 },
		{ field: 'brand', width: 150 },
		{ field: 'untilEnd', width: 120, type: 'rightAligned' },
		{ field: 'number', width: 200 },
		{ field: 'type' }
	];

	function add() {
		gridStore.add(Array.from(Array(qty)).map(() => randCreditCard()));
	}

	$: rowData = $gridStore as [];
</script>

<DocumentHead title="Grid" description="Grid Example" />

<Adder {add} bind:qty store={gridStore} />

<div class="mt-4">
	{#await gridStore.init()}
		<div>Loading...</div>
	{:then}
		{#if !$gridStore.length}
			<div>Empty 🤷‍♂️</div>
		{/if}

		<div class="h-[600px]">
			<AgGrid {rowData} {columnDefs} />
		</div>
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
