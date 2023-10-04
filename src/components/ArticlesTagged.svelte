<script>
	import { onMount } from 'svelte';
	import { prettyDate } from '$lib/utils/index.js';

	export let tag;
	export let articlePath;

	$: serverUrl = `/api/tags?tag=${tag}`;

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
    <a href="/blog/tags/{tag}" title={tag} class="font-bold">
        #{tag}
    </a>

	{#await promise}
		loading...
	{:then tags}
		<div class="mt-2 flex flex-col gap-2">
			{#each tags[tag] as article}
				{#if articlePath !== article.path}
					<div class="flex gap-4 items-center justify-between">
						<a href={article.path} title={article.meta.title}>
							{article.meta.title}
						</a>

						<small class="text-sm">{prettyDate(article.meta.published)}</small>
					</div>
				{/if}
			{/each}
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</article>
