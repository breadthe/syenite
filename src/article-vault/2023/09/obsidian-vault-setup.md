---
title: WIP Obsidian vault setup
description: Setting up the Obsidian vault for Syenite
author:
author_url:
published: 2023-09-06T14:30
updated: 
tags:
  - syenite
  - obsidian
---

I described briefly in [[syenite-building-blocks]] how Obsidian links are transformed to HTML.

I this guide I'll talk about how to setup your Obsidian article vault.

My implementation assumes that the Obsidian vault is co-located with the blog codebase. Ideally, the two should be separated, so that you could keep the blog and vault in different repos and link them via a reference.

[swyxkit](https://github.com/swyxio/swyxkit/) has that, but I think the way it does it is too complicated. For that reason, I decided to start simple using co-location and see if I can improve it down the road.

## Implementation

The Obsidian vault is named `article-vault` and is hardcoded at the moment. `article-vault` is referenced in these places:

- `src/routes/[year]/[month]/[slug]/+page.js`
- `vite.config.ts`
- `src/lib/utils/index.js`

My intention is to make it 1) configurable in `config.js` and later 2) separate it entirely from the blog engine into its own repository.

## Folder structure

For now, this is what the vault folder structure looks like.

![[obsidian-vault-structure.png]]

The vault itself is located in `/src`. Within, there are 3 subfolders of interest:

- `_assets` contains any images that you link in articles. For example `horse-head.png` is referenced in `markdown-showcase.md` using Obsidian syntax.
- `.obsidian` is created automatically by Obsidian, contains Obsidian's settings for the vault, and is ignored by default. If you want to add it to version control, feel free to remove it from `.gitignore`.
- `2023/09` etc is the article structure. I explained how I ended up with this structure in [[url-and-folder-structure]]. Ultimately it's not too hard to make this flat (or whatever you fancy), just keep in mind that this engine is opinionated, and this is what works for me.

