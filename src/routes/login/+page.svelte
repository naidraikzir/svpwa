<script lang="ts">
	import { goto } from '$app/navigation';
	import DocumentHead from '$lib/components/DocumentHead.svelte';

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
	<form class="flex flex-col p-2" on:submit|preventDefault={login}>
		<fieldset class="mb-2">
			<label>
				Username
				<input type="text" class="block px-2 py-1 border" bind:value={form.username} required />
			</label>
		</fieldset>
		<fieldset class="mb-2">
			<label>
				Password
				<input type="password" class="block px-2 py-1 border" bind:value={form.password} required />
			</label>
		</fieldset>
		<button type="submit" class="self-end mt-2 px-3 py-1 bg-white shadow-lg rounded">Login</button>
	</form>
</div>
