<script>
    import { SITE_TITLE, DEFAULT_OG_IMAGE } from '$lib/config.js'
	import '$css/app.postcss'
	import Header from '$components/Header.svelte'
	import Footer from '$components/Footer.svelte'

    $: image = DEFAULT_OG_IMAGE
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={'RSS Feed for ' + SITE_TITLE}
		href="/rss.xml"
	/>

    <meta name="description" content={`${SITE_TITLE} opinionated af static blog engine`} />
	<meta property="og:image" content={image} />
</svelte:head>

<Header />

<main class="max-w-4xl mx-auto">
	<section class="flex flex-col gap-2 sm:gap-4 mx-4">
		<slot />
	</section>
</main>

<Footer />

<style>
	main {
		height: 100%;
	}
</style>
