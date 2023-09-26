<script lang="ts">
	import 'ag-grid-community/styles/ag-grid.min.css';
	import 'ag-grid-community/styles/ag-theme-alpine.min.css';
	import type { ColDef } from 'ag-grid-community';
	import AgGridSvelte from 'ag-grid-svelte';
	import { theme } from '$lib/stores/theme';

	export let defaultColDef: ColDef = {
		filter: true,
		resizable: true,
		sortable: true
	};
	export let columnDefs: ColDef[] = [];
	export let rowData: [];

	$: agTheme = $theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
</script>

<div class="h-full {agTheme}">
	<AgGridSvelte {rowData} {columnDefs} {defaultColDef} />
</div>
