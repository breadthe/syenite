---
title: Syenite v0.3
description: "New features in Syenite v0.3: Obsidian heading links, external link behavior, and more"
author:
author_url:
published: 2023-10-09T07:30
updated:
tags:
  - syenite
---

Syenite v0.3 has been released.

## New features

### ✨ External link behavior (for articles)

External links in articles now have a 🔗 icon attached and open in a new tab. To be considered external, a URL must not be relative, and must be prefixed with `http(s)://`.

In contrast, internal links are relative links pointing to another blog article.

![[syenite-v0.3-external-links.png|External vs internal links in Syenite v0.3]]

Here's how an external Obsidian link is transformed to HTML:

```html
\[Frank Noirot](https://franknoirot.co/)

<a target="_blank" href="https://franknoirot.co/" rel="nofollow">Frank Noirot 🔗</a>
```

## Improvements

### 🛠 Obsidian heading link support

In addition to the Obsidian links supported in v0.1, the following types and patterns have been made possible in v0.3.

**v0.1** Simple link to another Obsidian document with optional link text

```html
\[\[3rd-party-services]]
<a href="/2023/09/3rd-party-services">3rd-party-services</a>

\[\[3rd-party-services|3rd party services]]
<a href="/2023/09/3rd-party-services">3rd party services</a>
```

**v0.3** Link to a heading in another Obsidian document with optional link text

```html
\[\[3rd-party-services#tailgraph.com]]
<a href="/2023/09/3rd-party-services#tailgraph-com">3rd-party-services#tailgraph.com</a>

\[\[url-and-folder-structure#Static pages as `.md` files]]
<a href="/2023/09/url-and-folder-structure#static-pages-as-md-files">url-and-folder-structure#Static pages as <code>.md</code> files</a>

\[\[url-and-folder-structure#Static pages as `.md` files|Static pages as .md files]]
<a href="/2023/09/url-and-folder-structure#static-pages-as-md-files">Static pages as .md files</a>
```

Key highlight here, beside how awesome it is to *link to a specific heading in another article*, is that the hashmark text is sanitized and transformed to snake-case, to match the Table of Contents.

### 💄 Centered images

Article images are now centered.

### 💄 Full height layout

The main body of each page now expands to the full height of the window regardless of how little content is on the page.

