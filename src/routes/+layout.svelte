<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header class="flex flex-row place-content-between items-center p-4">
	<h1 class="text-2xl"><a href="/">Deno Sveltekit</a></h1>
	<img id="deno" class="w-32" src="/vite-deno.svg" alt="Vite with Deno" />
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

<style lang="postcss">
	@keyframes wiggle {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(15deg);
		}
		50% {
			transform: rotate(0deg);
		}
		75% {
			transform: rotate(-15deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	#deno:hover {
		animation: wiggle 1s ease-in-out infinite;
	}
</style>
