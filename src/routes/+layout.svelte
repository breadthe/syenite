<script>
    import { SITE_URL, SITE_TITLE, DEFAULT_OG_IMAGE, AUTHOR_URL } from '$lib/config.js'
	import '$css/app.postcss'
	import Header from '$components/Header.svelte'
	import Footer from '$components/Footer.svelte'

    $: image = DEFAULT_OG_IMAGE

    // strip http or https from SITE_URL
    const siteUrl = SITE_URL.replace(/^(https?:\/\/)/, '');
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={'RSS Feed for ' + SITE_TITLE}
		href="/rss.xml"
	/>

    <!-- Mastodon webmentions -->
    <link href={AUTHOR_URL} rel="me">
    <link rel="webmention" href={`https://webmention.io/${siteUrl}/webmention`} />
    <link rel="pingback" href={`https://webmention.io/${siteUrl}/xmlrpc`} />

    <meta name="description" content={`${SITE_TITLE} opinionated af static blog engine`} />
	<meta property="og:image" content={image} />
</svelte:head>

<Header />

<main class="w-full max-w-4xl mx-auto flex-1">
	<section class="flex flex-col gap-2 sm:gap-4 mx-4">
		<slot />
	</section>
</main>

<Footer />
