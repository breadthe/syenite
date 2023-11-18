<script>
	import { onMount } from 'svelte';
	import { prettyDate } from '$lib/utils/index.js';

	export let tag;
	export let articlePath;

	$: serverUrl = `/api/tags?tag=${tag}&sort_by=published&order=desc`;

	// passing tag to trick it into being responsive
	async function getTags(tag) {
		const response = await fetch(serverUrl);
		return await response.json();
	}

	$: promise = getTags(tag);

	onMount(async () => {
		promise = await getTags();
	});
</script>

<article class="">
	{#await promise}
		<span class="text-[--text-color-muted]">loading <strong>{tag}</strong>...</span>
	{:then tags}
		<span>
			<a href="/blog/tags/{tag}" title={tag} class="font-bold">
				#{tag}
			</a>

			<small>({tags[tag].length})</small>
		</span>

		<div class="mt-2 flex flex-col gap-2">
			{#each tags[tag] as article}
				<div class="flex gap-4 items-center justify-between">
					{#if articlePath === article.path}
						<span class="text-[--text-color-muted]">{article.meta.title}</span>
					{:else}
						<a href={article.path} title={article.meta.title}>
							{article.meta.title}
						</a>
					{/if}

					<small class="text-sm">{prettyDate(article.meta.published)}</small>
				</div>
			{/each}
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</article>
