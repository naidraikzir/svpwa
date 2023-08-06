<script lang="ts">
	import type { ColDef } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
	import AgGridSvelte from 'ag-grid-svelte';

	export let defaultColDef: ColDef = {
		filter: true,
		resizable: true,
		sortable: true
	};
	export let columnDefs: ColDef[] = [];
	export let rowData: [];
</script>

<div class="h-full ag-theme-alpine">
	<AgGridSvelte {rowData} {columnDefs} {defaultColDef} />
</div>
