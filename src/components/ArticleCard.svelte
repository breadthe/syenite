<script>
	import Tags from '$components/Tags.svelte';
	import { prettyDate } from '$lib/utils/index.js';

	export let article;
</script>

<article class="flex flex-col gap-2">
	<div class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center justify-between">
		<h2 class="text-xl font-semibold">
			<a href={article.path}>
				{article.meta.title}
			</a>
		</h2>

		<small class="text-sm italic">{prettyDate(article.meta.published)}</small>
	</div>

	<div class="text-[--text-color-muted]">
		{article.meta.description}
	</div>

	<Tags tags={article.meta.tags} />
</article>
