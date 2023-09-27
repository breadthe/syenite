---
title: Syenite wishlist
description: Future features that are planned or desired
author:
author_url:
published: 2023-09-24T14:30
updated:
tags:
  - syenite
---

This is a list of features that I would like Syenite to have. None of these is guaranteed, but it's good to track them in one place. The list is roughly in the order of priority I would like to tackle them.

If you haven't already, check out the [[syenite-features|current features]].

## Authoring (markdown + Obsidian)

- Handle Obsidian article links with heading references. This doesn't work...

```
\[\[url-and-folder-structure#Static pages as `.md` files|URL and folder structure]]
```

... but should be transformed to `http://example.com/2023/09/url-and-folder-structure#static-pages-as-md-files`

## Content/SEO

- Hero image in frontmatter
- "More articles tagged xxx" at bottom of article
- "Latest (10) articles" component, to be used on landing page and/or bottom of each article

## General

- 404 page(s)
- Article search
- Mastodon mentions
- Blog index pagination
- More configurable parameters in `config.js`
- Separate `article-vault` repo from blog engine
- Article reading time estimator
- Syenite icon :)

## Styling

- Mobile main nav
- Full height layout - currently pages or articles with very little content look weird with the site footer almost pushing up against the header

## Fixes

- Internal links should have the full URL in the href, not just the relative path, so instead of `/2023/09/markdown-styling` I want `http://example.com/2023/09/markdown-styling`
- External links should have a little ↗ icon attached
- Handle double **Updated** scenario (when both `updated` frontmatter is set and the `UpdatedAt` component is used in the same article)
