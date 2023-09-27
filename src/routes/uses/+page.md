<script>
    import { SITE_TITLE } from '$lib/config.js';
    import Heading from '$components/Heading.svelte'
	import '$css/markdown.css';
</script>

<svelte:head>
	<title>What tech { SITE_TITLE } uses</title>
	<meta name="description" content={`What tech ${SITE_TITLE} uses`} />
</svelte:head>

<Heading>Uses</Heading>

<article class="markdown-body">

**Here's some stuff I use**

- SvelteKit
- VS Code
- Emojis 🎲

```js
console.log('kjaka');
```
</article>
