<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import DocumentHead from '$lib/components/DocumentHead.svelte';
	import Themer from '$lib/components/Themer.svelte';

	let form = {
		username: '',
		password: ''
	};

	function login() {
		if (form.username && form.password) {
			localStorage.token = crypto.getRandomValues(new BigUint64Array(1))[0].toString(16);
			goto('/');
		}
	}
</script>

<DocumentHead title="Login" description="Login" />

<div class="min-h-screen flex items-center justify-center">
	<div class="fixed top-0 right-0 p-4">
		<Themer />
	</div>

	<form class="flex flex-col p-2" on:submit|preventDefault={login}>
		<fieldset class="mb-2">
			<label>
				Username
				<input
					type="text"
					class="block px-2 py-1 border dark:border-none dark:bg-neutral-800"
					bind:value={form.username}
					required
				/>
			</label>
		</fieldset>
		<fieldset class="mb-2">
			<label>
				Password
				<input
					type="password"
					class="block px-2 py-1 border dark:border-none dark:bg-neutral-800"
					bind:value={form.password}
					required
				/>
			</label>
		</fieldset>
		<Button type="submit" class="self-end mt-2">Login</Button>
	</form>
</div>
