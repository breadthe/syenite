<script>
	import { SITE_TITLE } from '$lib/config.js';
	import Heading from '$components/Heading.svelte';
	import InspiredBy from '$components/InspiredBy.svelte';
	import BuiltWith from '$components/BuiltWith.svelte';
</script>

<svelte:head>
	<title>{ SITE_TITLE }</title>
	<meta name="description" content={`${SITE_TITLE} static blog engine, opinionated af`} />
</svelte:head>

<Heading>
	<span
		class="font-black bg-clip-text text-transparent bg-gradient-to-br from-[--primary-color] via-[--primary-color] to-blue-950"
		>{SITE_TITLE}</span
	>
	<span class="font-light text-[--text-color-muted]">//</span>
	<span class="font-semibold text-[--text-color-muted]">static blog engine</span>
	<br />
	<span class="text-base text-[--text-color-muted] italic">opinionated af</span>
</Heading>

<hr>
<br>

<p>
    <strong>Built with</strong>
</p>

<div class="flex flex-wrap gap-4">
    <BuiltWith linkUrl="https://kit.svelte.dev/" linkName="SvelteKit"></BuiltWith>
    <BuiltWith linkUrl="https://vitejs.dev/" linkName="Vite"></BuiltWith>
    <BuiltWith linkUrl="https://mdsvex.com/" linkName="mdsvex"></BuiltWith>
    <BuiltWith linkUrl="https://tailwindcss.com/" linkName="Tailwind CSS"></BuiltWith>
    <BuiltWith linkUrl="https://teenyicons.com/" linkName="Teenyicons"></BuiltWith>
</div>

<br>

<p>
	<strong>Heavily inspired by</strong>
</p>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
	<InspiredBy
		linkUrl="https://github.com/swyxio/swyxkit/"
		linkName="Swyxkit"
		authorUrl="https://www.swyx.io/"
		authorName="swyx"
	/>
	<InspiredBy
		linkUrl="https://github.com/franknoirot/obsidian-sveltekit-blog/"
		linkName="Obsidian SvelteKit blog"
		authorUrl="https://franknoirot.co/"
		authorName="Frank Noirot"
	/>
	<InspiredBy
		linkUrl="https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog"
		linkName="Let's learn SvelteKit by building a static Markdown blog from scratch"
		authorUrl="https://joshcollinsworth.com/"
		authorName="Josh Collinsworth"
	/>
</div>
