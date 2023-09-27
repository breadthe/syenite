---
title: URL and folder structure
description: How the folder-based URL structure was designed
author:
author_url:
published: 2023-09-23T14:30
updated: 
tags:
  - syenite
---

## Page URLs

These are simple - just the SvelteKit defaults. So for the blog index, just go to

`https://example.com/blog`

In addition, this template ships with several more pages: `/about`, `/uses`, `/contact`, and `/tags` ( a "hidden" one not linked in the main nav).

## Article URLs

Naming things is hard, including such a simple thing as "article" or "post". Ultimately I landed on "article", which conveys a dash more artistry despite being longer.

`https://example.com/2023/09/syenite-blog-engine`

### But why the ugly prefixes?

For a long time I struggled with the concept of whether I should prefix article slugs with `year-month-` or not, or whether I should nest them like they currently are. I had to choose between these options, with pros and cons for each.

1. `https://example.com/syenite-blog-engine`
2. `https://example.com/blog/syenite-blog-engine`
3. `https://example.com/blog/2023/09/syenite-blog-engine`
4. `https://example.com/2023-09-syenite-blog-engine`
5. `https://example.com/2023/09/syenite-blog-engine`

## How article URLs are resolved

First thing you should know, as a SvelteKit developer, is that the article page (or "shell" if you will) is nested in

`src/routes/[year]/[month]/[slug]/+page.svelte`

The article data is provided by

`src/routes/[year]/[month]/[slug]/+page.js`

## Ignoring certain import folders (assets & drafts)

The logic for getting all the markdown articles is defined in `src/lib/utils/index.js` in the `fetchMarkdownArticles` function.

I've set this up so that it ignores imports from the `_assets` and `_drafts` folders. Until an article is ready to be published it can be kept safely in `_drafts` and you won't have to worry that it will be included.

The ability to ignore importing from certain folders is given by this [Vite feature](https://vitejs.dev/guide/features.html#negative-patterns).

## Static pages as `.md` files

You can, indeed use a `.md` file as a top-level page instead of `.svelte`.

Here's what my `/uses` page defined in `src/routes/uses/+page.md` looks like:

```
<script>
    import Heading from '$components/Heading.svelte'
	import '$css/markdown.css';
</script>

<Heading>Uses</Heading>

<article class="markdown-body">

Write markdown here

</article>
```

The only caveat is that you should wrap your markdown content in `<article class="markdown-body">` to benefit from proper styling.
