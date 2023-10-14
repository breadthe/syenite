<script>
	import { onMount } from 'svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let searchInput;
	const searchStr = queryParam('search', ssp.string(), { debounceHistory: 500 });

	const focusSearchInput = (e) => {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			searchInput.focus();
		}
	};

	onMount(() => {
		// listen for CMD+K or CTRL+K and focus the search input
		window.addEventListener('keydown', focusSearchInput);

		return () => window.removeEventListener('keydown', focusSearchInput);
	});
</script>

<div class="w-full max-w-xl mx-auto flex items-center relative">
	<input
		type="text"
		bind:this={searchInput}
		bind:value={$searchStr}
		class="flex-1 border border-[--border-color] rounded px-4 py-2 pr-10"
		placeholder="CMD+K or CTRL+K to search articles"
		aria-label="Search articles"
	/>
	<svg
		viewBox="0 0 15 15"
		fill="none"
		stroke="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		width="15"
		height="15"
		class="absolute right-0 mr-4 text-[--text-color-muted]"
		><path d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z" stroke="currentColor"></path></svg
	>
</div>
