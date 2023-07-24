<script lang="ts">
	import { randFullName, randEmail, randPastDate } from '@ngneat/falso';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import { listStore } from '$lib/stores/list';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import Adder from '$lib/components/Adder.svelte';

	let qty = 1;

	function add() {
		listStore.add(
			Array.from(Array(qty)).map(() => ({
				name: randFullName(),
				email: randEmail(),
				birthdate: randPastDate()
			}))
		);
	}
</script>

<DocumentHead title="List" description="List Example" />

<Adder {add} bind:qty store={listStore} />

<div class="mt-4">
	{#await listStore.init()}
		<div>Loading...</div>
	{:then}
		{#if !$listStore.length}
			<div>Empty 🤷‍♂️</div>
		{/if}

		<div class="h-[500px] text-xs">
			<VirtualScroll data={$listStore} key="email" let:data>
				<div class="py-2">
					<div class="text-lg font-semibold">{data.name}</div>
					<div>{data.email}</div>
					<div>
						{Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(data.birthdate)}
					</div>
				</div>
			</VirtualScroll>
		</div>
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
