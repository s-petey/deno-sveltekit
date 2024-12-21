<script lang="ts">
	let { data } = $props();
</script>

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
	<div class="grid grid-flow-col">
		{@render pageButton(1, data.page === 1, false, '←')}

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
{/if}

{#snippet pageButton(page: number, disabled: boolean, active: boolean, child: string | number)}
	<button class="rounded border p-4" class:disabled {disabled} class:active type="button">
		<a href="/?page={page}" class:pointer-events-none={disabled}>{child}</a>
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
