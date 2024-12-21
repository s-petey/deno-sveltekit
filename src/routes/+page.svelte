<script lang="ts">
	import { goto, invalidate, replaceState } from '$app/navigation';
	import { page as sveltePage } from '$app/state';

	let { data } = $props();

	let q = $state(data.q);

	function handlePageChange(page: number) {
		const params = new URLSearchParams(sveltePage.url.searchParams);

		params.set('page', page.toString());
		goto(`?${params.toString()}`, { keepFocus: true });
	}

	function handleQueryChange() {
		if (q) {
			const params = new URLSearchParams(sveltePage.url.searchParams);

			params.set('q', q);
			params.set('page', '1');
			goto(`?${params.toString()}`, { keepFocus: true });
		}
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		handleQueryChange();
	}}
	class="mb-4"
>
	<label class="mb-2 block text-sm font-bold" for="q">Search</label>
	<input
		class="focus:shadow-outline w-ful form-input appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
		type="text"
		id="q"
		name="q"
		bind:value={q}
		placeholder="Search"
	/>
</form>

<section class="mb-4 grid max-h-96 grid-cols-2 gap-4 overflow-y-auto">
	{#each data.dinos as item}
		<a class="rounded border p-4" href="/{item.name}">{item.name}</a>
	{/each}

	{#if data.dinos.length === 0}
		<p>No dinos found</p>
	{/if}
</section>

<!-- pagination -->
{#if data.totalPages > 0}
	<div class="mb-4 flex justify-center">
		<div class="grid w-1/2 grid-flow-col gap-2">
			{@render pageButton(data.page - 1, data.page === 1, false, '←')}

			{#each { length: data.totalPages }, page}
				{#if page >= data.page - 2 && page <= data.page + 2}
					{@render pageButton(page + 1, data.page === page + 1, data.page === page + 1, page + 1)}
				{:else if (page === 0 || page === 1) && page !== data.page - 1}
					{@render pageButton(page + 1, data.page === page + 1, data.page === page + 1, page + 1)}
				{:else if page >= data.totalPages - 2 && page !== data.page - 1}
					{@render pageButton(page + 1, data.page === page + 1, data.page === page + 1, page + 1)}
				{/if}
			{/each}

			{@render pageButton(data.page + 1, data.page === data.totalPages, false, '→')}
		</div>
	</div>
{/if}

{#snippet pageButton(page: number, disabled: boolean, active: boolean, child: string | number)}
	<button
		class="rounded border p-4"
		class:disabled
		{disabled}
		class:active
		type="button"
		onclick={() => handlePageChange(page)}
	>
		{child}
	</button>
{/snippet}

<style>
	.active {
		@apply bg-emerald-400 text-white;
	}

	.disabled {
		@apply cursor-not-allowed opacity-50;
	}
</style>
