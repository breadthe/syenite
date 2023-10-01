<script>
    import { SITE_TITLE } from '$lib/config.js';
	import Heading from '$components/Heading.svelte';
	import TagCard from '$components/TagCard.svelte';

	export let data;

    $: title = data.isTagsIndex
        ? 'All tags'
        : `Articles tagged: ${data.currentTag}`
</script>

<svelte:head>
	<title>{title} | {SITE_TITLE}</title>
	<meta name="description" content={`${SITE_TITLE} static blog engine, opinionated af`} />
</svelte:head>

<Heading>
	<a href="/blog/tags" title="Tags index">All tags</a>
</Heading>

{#each Object.keys(data.tags) as tag}
	<hr />

	<TagCard {tag} articles={data.tags[tag]} />
{/each}
