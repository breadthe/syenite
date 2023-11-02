---
title: Syenite wishlist
description: Future features that are planned or desired
author:
author_url:
published: 2023-09-24T14:30
updated: 2023-10-08T09:30
tags:
  - syenite
---

This is a list of features that I would like Syenite to have. None of these is guaranteed, but it's good to track them in one place. The list is roughly in the order of priority I would like to tackle them.

If you haven't already, check out the [[syenite-features|current features]].

For more detailed notes, check out the [[syenite-v0.2|v0.2]] and [[syenite-v0.3|v0.3]] releases.

## Content/SEO

- "Latest (10) articles" component, to be used on landing page and/or bottom of each article

## General

- Article search
- Mastodon mentions
- Blog index pagination
- More configurable parameters in `config.js`
- Separate `article-vault` repo from blog engine
- [utteranc.es](https://utteranc.es/) integration
- Article reading time estimator
	- see https://github.com/lbenie/reading-time-estimator
	- see implementation https://github.com/hendrikmitk/hendrikharlichs/blob/main/src/routes/notes/%5Bslug%5D/%2Bpage.ts
- Syenite icon :)

## Styling

- Page transitions (see https://joshcollinsworth.com/blog/sveltekit-page-transitions)
- Proper code highlighting
- Dark mode scroll bars

## Fixes

- Navigating to a link with a hashmark (heading link) doesn't refresh or re-initialize the table of contents on that page. This is a problem with the TOC library I am using ([explicitly mentioned in the docs](https://svelte-put.vnphanquang.com/docs/toc#no-dynamic-update)).
- ~~Internal links should have the full URL in the href, not just the relative path, so instead of `/2023/09/markdown-styling` I want `http://example.com/2023/09/markdown-styling`~~ Actually I think I'm ok with relative links for now.
- Handle double **Updated** scenario (when both `updated` frontmatter is set and the `UpdatedAt` component is used in the same article). Not super high priority, since this can be handled simply by not using the Updated component.
