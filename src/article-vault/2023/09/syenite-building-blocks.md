---
title: Syenite building blocks
description: A high level overview of how Syenite is constructed
author:
author_url:
published: 2023-09-22T14:30
updated: 2023-10-08T14:30
tags:
  - syenite
  - obsidian
---

At the highest level, Syenite is built on [SvelteKit](https://kit.svelte.dev/), with [Vite](https://vitejs.dev/) and [Tailwind CSS](https://tailwindcss.com/). But there are  more bits and pieces that make it work.

## mdsvex

[mdsvex](https://mdsvex.com/) is what allows Svelte code to exist and be executed from markdown files. This is cool because it allows dynamic components in markdown pages and articles, if you need it.

One example in Syenite is the `src/components/UpdatedAt.svelte` component.

You might wonder why would I need such a component when I can just get the `updated` timestamp from the frontmatter. Well, that's because sometimes I want the updated date to be "evergreen", in other words to always show today's date. Bbbut why?? I have a very specific thing in mind for the future (I said this engine was *opinionated af*, didn't I?).

## Swyxkit

I lifted and adapted many parts from [Swyxkit](https://www.swyx.io/). I like a lot about that engine, but it's a bit too feature-packed for me, plus it lacks a few things I want. Here are some things I poached.

- the dark/light toggle (`src/components/DarkModeToggle.svelte`)
- RSS (`src/routes/rss.xml/+server.js`) and sitemap (`src/routes/sitemap.xml/+server.js`)
- the table of contents (`src/components/TableOfContents.svelte`)
- the `head` metadata stuff - tedious and boring stuff, glad someone else has handled it

## Obsidian integration

In theory, using Obsidian to write articles sounds straightforward. Just point the vault to a folder inside the blog codebase and start writing. Then SvelteKit + mdsvex takes care of the rest, right?

Well, not so fast. There's the not-insignificant matter of internal document references that need to be converted to URLs, with a similar thing for images and other assets.

In other words, we want to convert links:

```
\[\[syenite-blog-engine|Syenite an opinionated blog engine]]

👇

<a href="/2023/09/syenite-blog-engine">Syenite an opinionated blog engine</a>
```

and images:

```
!\[\[horse-head.png|Horse head]]

👇

<img src="/assets/horse-head.png" title="Horse head" alt="Horse head">
```

This is not trivial. So rather than shattering my brain trying to figure it out, I thought "surely someone else must have done it already". Thankfully, a developer named [Frank Noirot](https://franknoirot.co/) did the legwork and wrote an article about it https://github.com/franknoirot/obsidian-sveltekit-blog/.

While he only implemented document links (anchors), as soon as I made the first rough prototype I realized that images work differently. The heavy lifting had already been done so all I had left was to add very similar code to deal with images.

This logic can be found in `src/lib/utils/index.js`. The code may look messy, and some of it is repeating, but it's all good - it works and that's all that matters!

Read more about [[obsidian-vault-setup|setting up the Obsidian vault]].

### This doesn't work... yet

One Obsidian feature that is unsupported (it will throw a compile error) is referencing headings in an article.

This

```
\[\[syenite-blog-engine#The Frankenblog|Syenite blog engine]]
```

should resolve to

```html
<a href="/2023/09/syenite-blog-engine#the-frankenblog">Syenite blog engine</a>
```

Similarly, a heading containing inline code such as

```
\[\[url-and-folder-structure#Static pages as `.md` files|URL and folder structure]]
```

should resolve to

```html
<a href="/2023/09/url-and-folder-structure#static-pages-as-md-files">URL and folder structure</a>
```

## Packages

- https://github.com/remarkjs/remark-html - extracts HTML from markdown, used for the RSS feed
- https://github.com/paoloricciuti/sveltekit-search-params - makes working with URL search parameters a lot easier
- https://github.com/leeoniya/uFuzzy - fuzzy search for articles
- ~~https://github.com/ejrbuss/markdown-to-txt - transforms markdown to plaintext to make it easy to search~~ no bueno, has a bug https://github.com/ejrbuss/markdown-to-txt/issues/20 (needs lodash). Alternatives:
	- https://github.com/showdownjs/showdown - extract HTML from markdown, then get the text node
	- https://github.com/earldouglas/codedown - not what I need, used for extracting code blocks

## Other

Additionally, Syenite uses several [[3rd-party-services|tools and services]] to make life easier.
