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

	<p slot="description">
		Esse ipsum voluptate qui aliqua sunt ipsum duis excepteur aliqua enim irure adipisicing enim. Dolore aliquip
		exercitation excepteur mollit fugiat. Ullamco incididunt pariatur reprehenderit do exercitation adipisicing tempor.
		Voluptate mollit minim ex dolore nisi veniam quis ullamco nostrud culpa magna Lorem id. Reprehenderit minim ea elit
		nostrud sit sunt officia amet sunt elit est. Tempor do ut anim ex ea qui aute veniam quis occaecat. Laborum nulla ad
		magna ea sit elit id nulla mollit nulla.
	</p>
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
