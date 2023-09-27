<script>
	import Tags from '$components/Tags.svelte';
	import { prettyDate } from '$lib/utils/index.js';

	export let article;
</script>

<article class="flex flex-col gap-1">
	<h2 class="text-xl font-semibold">
		<a href={article.path}>
			{article.meta.title}
		</a>
	</h2>

	<div class="flex gap-4 items-center justify-between">
		<small class="text-sm">{prettyDate(article.meta.published)}</small>

		<Tags tags={article.meta.tags} />
	</div>

    <div class="text-[--text-color-muted]">
        {article.meta.description}
    </div>
</article>
