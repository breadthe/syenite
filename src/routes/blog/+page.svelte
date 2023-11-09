<script>
	import { SITE_TITLE } from '$lib/config.js'
	import { queryParam, ssp } from 'sveltekit-search-params'
	import uFuzzy from '@leeoniya/ufuzzy'
	import Heading from '$components/Heading.svelte'
	import ArticleCard from '$components/ArticleCard.svelte'
	import Search from '$components/Search.svelte'
	import { convert } from 'html-to-text'

	const searchStr = queryParam('search', ssp.string(), { debounceHistory: 500 })

	export let data

	// https://github.com/leeoniya/uFuzzy#options
	const uf = new uFuzzy({ intraMode: 1 })

	let flatArticles
	$: {
		if (data.articles.length > 0) {
			flatArticles = data.articles.map((article) => {
				// Extract HTML, then text from markdown (used in search)
				const articleHtml = article.content
				const articleText = convert(articleHtml, {
					wordwrap: false,
					selectors: [
						// { selector: 'a', options: { ignoreHref: true } },
						// { selector: 'img', format: 'skip' },
					]
				})

				return (
					article.meta.title +
					' ' +
					article.meta.description +
					' ' +
					article.meta.tags.join(' ') +
					' ' +
					articleText
				)
			})
		}
	}

	let idxs = []
	$: {
		if ($searchStr) {
			idxs = uf.filter(flatArticles, $searchStr)
			const info = uf.info(idxs, flatArticles, $searchStr)
			const order = uf.sort(info, flatArticles, $searchStr)
		} else {
			idxs = []
		}
	}

	let filteredArticles
	$: {
		if (idxs.length > 0) {
			filteredArticles = idxs.map((idx) => {
				return data.articles[idx]
			})
		} else if ($searchStr) {
			filteredArticles = []
		} else {
			filteredArticles = data.articles
		}
	}
</script>

<svelte:head>
	<title>{SITE_TITLE} blog</title>
	<meta name="description" content={`Latest ${SITE_TITLE} articles`} />
</svelte:head>

<Heading>
	{SITE_TITLE} Blog

	<div slot="description">
        <p>
            What better way to test a blog engine than to blog about building it? This is where I'll be posting updates about the development of {SITE_TITLE}. There will be two main types of articles here: <strong>releases</strong> and <strong>building blocks</strong>.
        </p>
        <p>
            <strong>Release</strong> articles are all about showcasing all the new features that I added/updated/fixed in the last version increment.
        </p>
        <p>
            <strong>Building block</strong> articles dive deeper into the code and explain how I built a specific feature. These articles are meant to be more technical and are aimed at developers who want to learn what makes {SITE_TITLE} tick.
        </p>
	</div>
</Heading>

<Search />

{#if $searchStr}
	<p class="text-center">
		{filteredArticles.length} result{filteredArticles.length > 1 ? 's' : ''} for "<strong>{$searchStr}</strong>"
	</p>
{/if}

{#each filteredArticles as article}
	<hr />

	<ArticleCard {article} />
{/each}

<style>
    p {
        margin-bottom: theme('spacing.4');
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
