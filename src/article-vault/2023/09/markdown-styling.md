---
title: Markdown styling
description: How I styled the markdown content
author:
author_url:
published: 2023-09-05T14:30
updated:
tags:
  - markdown
---

Styling markdown is not easy and since I don't have unlimited time at my disposal to make my own stylesheet, I found one online that I liked and adapted it.

As a developer, I like GitHub's markdown styling. This repo https://github.com/sindresorhus/github-markdown-css replicates it.

It contains 3 stylesheets:

- `github-markdown-dark.css`
- `github-markdown-light.css`
- `github-markdown.css`

I decided to focus on `github-markdown.css`. I am not applying it globally, only on the pages that need it.

- `src/routes/[year]/[month]/[slug]/+page.svelte` - the article template
- `src/routes/uses/+page.md` - a static page that starts off as a `.md` file instead of `.svelte` (yes, [[url-and-folder-structure|you can do that]])

## But we are opinionated, and also other things

While the default GitHub styling looks great, I realized it wouldn't do to simply plug it in and call it a day.

For one thing, supporting light and dark mode the way I implemented it (or rather Swyxkit) wouldn't work. Part of that is because these stylesheets hardcode text, background, and border colors.

For another, there's a lot of extra stuff in there that I don't need.

So I decided to fork `github-markdown.css` and customize it a bit with theming support via CSS tokens, as well as remove the unneeded selectors. I moved all the color definitions to tokens to the global stylesheet, so that the markdown stylesheet doesn't make color decisions anymore.

I named this slimmer, custom stylesheet  `markdown.css`.

## Custom custom styling

In `markdown.css`, you'll see references such as:

```
.markdown-body h1 {
  margin: .67em 0;
  font-weight: var(--font-weight-semibold);
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid var(--border-color);
}
```

You'll find the CSS tokens (is this even the right term? whatever) like `--border-color` defined in `src/css/app.postcss` right at the top.

If you wish to further customize my custom stylesheet, the sky is the limit. You can, for example, extract `font-family`, `font-size` or anything else.