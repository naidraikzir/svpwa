<script lang="ts">
	import { randCreditCard } from '@ngneat/falso';
	import type { ColDef } from 'ag-grid-community';
	import Adder from '$lib/components/Adder.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import AgGrid from '$lib/components/Grid/AgGrid.svelte';
	import gridStore from '$lib/stores/grid';

	let qty = 1;

	const columnDefs: ColDef[] = [
		{ field: 'fullName', pinned: 'left', width: 150 },
		{ field: 'brand', width: 150 },
		{ field: 'untilEnd', width: 120, type: 'rightAligned' },
		{ field: 'number', width: 200 },
		{ field: 'type' }
	];

	function add() {
		$gridStore = [...$gridStore, ...Array.from(Array(qty)).map(() => randCreditCard())];
	}

	function clear() {
		$gridStore = [];
	}

	$: rowData = $gridStore as [];
</script>

<DocumentHead title="Grid" description="Grid Example" />

<Adder on:add={add} on:clear={clear} bind:qty qtySaved={$gridStore.length} />

<div class="mt-4">
	<div class="h-[600px]">
		<AgGrid {rowData} {columnDefs} />
	</div>
</div>
