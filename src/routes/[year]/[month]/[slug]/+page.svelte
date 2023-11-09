<script>
	import { SITE_URL, AUTHOR_TWITTER_HANDLE } from '$lib/config.js';
	import { toc, createTocStore } from '@svelte-put/toc';
	import ArticlesTagged from '$components/ArticlesTagged.svelte';
	import Heading from '$components/Heading.svelte';
	import HeroImage from '$components/HeroImage.svelte';
	import MastodonShareBtn from '$components/MastodonShareBtn.svelte';
	import Tags from '$components/Tags.svelte';
	import TOC from '$components/TableOfContents.svelte';
	import UpdatedAt from '$components/UpdatedAt.svelte';
	import PreviousNextArticle from '$components/PreviousNextArticle.svelte';
	import { prettyDate } from '$lib/utils/index.js';
	import '$css/markdown.css';

	export let data;

	$: canonical = `${SITE_URL}${data.path}`;

	$: image =
		data?.image ||
		`https://og.tailgraph.com/og
            ?fontFamily=Poppins
            &title=${encodeURIComponent(data?.title)}
            &titleTailwind=font-bold%20text-blue-600%20text-7xl
            ${data?.description ? '&text=' + encodeURIComponent(data?.description) : ''}
            &textTailwind=text-gray-700%20mt-4%20text-2xl
            &textFontFamily=Roboto
            &logoTailwind=h-8
            &bgUrl=https%3A%2F%2Fwallpaper.dog%2Flarge%2F272766.jpg
            &bgTailwind=bg-white%20bg-opacity-30
            &footer=${encodeURIComponent(SITE_URL)}
            &footerTailwind=text-gray-600
            `.replace(/\s/g, ''); // remove whitespace

	const tocStore = createTocStore();
</script>

<svelte:head>
	<title>{data.title}</title>

	<!-- reference: https://gist.github.com/whitingx/3840905 -->

	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.title} />
	{#if data.subtitle}
		<meta property="subtitle" content={data.subtitle} />
	{/if}
	<meta name="description" content={data.description} />
	<meta property="og:description" content={data.description} />
	<meta name="twitter:card" content={data.image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + AUTHOR_TWITTER_HANDLE} />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
	<meta property="og:image" content={data.image ?? image} />
	<meta name="twitter:image" content={data.image ?? image} />
</svelte:head>

<Heading centerH1={true}>
	{data.title}

	<div slot="description" class="flex flex-col items-center">
		<div class="flex justify-between gap-8 w-full">
			<span class="text-sm italic">
				By:
				{#if data.author_url}
					<a href={data.author_url}>{data.author}</a>
				{:else}
					<span>{data.author}</span>
				{/if}
			</span>

			<span class="text-sm italic">{prettyDate(data.published)}</span>
		</div>

		<Tags tags={data.tags} />
	</div>
</Heading>

<HeroImage image={data.image} imageCredits={data.image_credits} title={data.title} />

<hr />

<TOC {tocStore} />

<article class="markdown-body" use:toc={{ store: tocStore, observe: true }}>
	{#if data.updated}
		<UpdatedAt updatedAt={data.updated} />
	{/if}

	<svelte:component this={data.content} />
</article>

<hr />
<div class="flex items-center gap-4">
    Share on
    <MastodonShareBtn pageUrl={canonical} pageDescription={data.description} />
</div>

{#if data.tags.length > 0}
	<hr />

	<h4 class="font-bold text-center">Other articles tagged</h4>

    {#each data.tags as tag}
		<ArticlesTagged {tag} articlePath={data.path} />
	{/each}
{/if}

<hr />

<PreviousNextArticle previous={data.previousArticle} next={data.nextArticle} />
