<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header class="flex flex-row place-content-between items-center p-4">
	<h1 class="text-2xl"><a href="/">Deno Sveltekit</a></h1>
	<img class="w-32" src="/vite-deno.svg" alt="Vite with Deno" />
</header>

<main class="container mx-auto p-4">
	{@render children()}
</main>

<footer class="my-4 flex flex-row justify-center gap-4">
	<p class="font-bold">
		<a href="https://svelte.dev/docs/kit">Sveltekit docs</a>
	</p>
	<p class="font-bold">
		<a href="https://docs.deno.com/">Dino docs</a>
	</p>
</footer>
