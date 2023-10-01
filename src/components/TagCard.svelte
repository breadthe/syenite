<script>
	import Tags from '$components/Tags.svelte';
	import { prettyDate } from '$lib/utils/index.js';

	export let tag;
	export let currentTag;
	export let articles;
</script>

<article class="">
	<h3 class="font-bold">
		{#if currentTag}
			#{tag}
		{:else}
			<a href="/blog/tags/{tag}" title={tag}>
				#{tag}
			</a>
		{/if}
	</h3>

	<div class="mt-4 flex flex-col gap-2">
		{#each articles as article}
			<div class="flex gap-4 items-center justify-between">
				<a href={article.path} title={article.meta.title}>
					{article.meta.title}
				</a>

				<small class="text-sm">{prettyDate(article.meta.published)}</small>
			</div>
		{/each}
	</div>
</article>
