---
title: Syenite features
description: All the features supported by the Syenite blog engine
author:
author_url:
published: 2023-09-21T14:30
updated: 
tags:
  - syenite
---

These are all the features that the Syenite blog engine currently offers. Check out the [[syenite-wishlist|wishlist]] for planned or desired features.

## Authoring

- Write articles in [markdown](https://commonmark.org/)
- [mdsvex](https://mdsvex.com/) allows **Svelte components in markdown**
- Use [Obsidian](https://obsidian.md/) to author articles, with support for:
	- linking other Obsidian documents in the same vault
	- linking images in the same vault
- YAML [frontmatter](https://mdsvex.com/docs#frontmatter-1) for article metadata
- Create **pages** with **Svelte** components (see `/about`) or **markdown** (see `/uses`)
- Create **drafts** in `_drafts` and drag them to the corresponding `[year]/[month]/` when the article is ready to be published

## General

- **Blog index** (`/blog`) with:
	- articles sorted in reverse `published` order (latest first)
	- article blurb based on `description` frontmatter
- Article **tags** with tags index (`/tags`)
- **RSS** feed (`/rss.xml`)
- **Sitemap** (`/sitemap.xml`)
- **Light / dark** mode with persistence in `localStorage`
- **Linkable** article **headings**
- Automatic **table of contents** from article headings (H1, H2, etc)
- Links to the **previous** and **next article** at the bottom of each article
- Configurable **Author name** & **URL**, overwritten in frontmatter
- Page/article header **metadata** and [open graph](https://ogp.me/) tags
- **TypeScript** support, although I've made zero effort to implement anything in TS

## Styling

- **Tailwind** CSS
- **GitHub markdown** styling, [[markdown-styling|customizable using CSS tokens]]
- Mobile-friendly / **responsive** layout
- Colors defined with **CSS tokens** in the main stylesheet (`app.postcss`)
- **PostCSS** support