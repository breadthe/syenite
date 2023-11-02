---
title: Syenite v0.4
description: "New features in Syenite v0.4: deep article search, hero image"
author:
author_url:
image: syenite-v0.4-hero.jpg
image_credits: https://unsplash.com/@thethomasensley
published: 2023-11-03T07:30
updated:
tags:
  - syenite
---

Syenite v0.4 has been released.

## New features

### ✨ Article search (deep)

There is now a search function in the [blog index](/blog). As you type, you are searching article titles, meta description, tags, and article content.

The state of the search persists in the URL, so you can share this `/blog?search=obsidian+vault` for example.

The core search logic is partly based on [swyxkit](https://github.com/swyxio/swyxkit/), specifically this bit https://github.com/swyxio/swyxkit/pull/169/files. My implementation is simplified, as it doesn't (yet, or ever?) highlight search results, and it uses a different approach for extracting the article text.

I used several packages for the search feature:

- https://github.com/paoloricciuti/sveltekit-search-params - makes working with URL search parameters a lot easier
- https://github.com/leeoniya/uFuzzy - text fuzzy search
- https://github.com/html-to-text/node-html-to-text - converts HTML to plaintext, to make it more convenient to search through it

### ✨ Hero image

You can now define a hero image in the article frontmatter, along with image credits. Example:

```yml
---
title: Draft article
description: Example of an article in the _drafts folder
author:
author_url:
image: example.jpg
image_credits: https://example.com
published: 2023-09-04T14:30
updated:
tags:
  - syenite
---
```

The hero image is located in `_assets`. See [[obsidian-vault-setup]]. Currently there's no support for (hot)linking images from external URLs.

There is some basic logic in place that checks if `image_credits` is a valid URL, in which case it renders it as an anchor, otherwise it's displayed as plain text.

The OG image meta tags should also use the hero image if it exists, instead of the default generated image.

This very article has a hero image.