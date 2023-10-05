---
title: Syenite v0.2
description: "New features in Syenite v0.2: mobile nav, 404 pages, other articles tagged, rewritten tags API, and more"
author:
author_url:
published: 2023-10-04T07:30
updated:
tags:
  - syenite
---

Syenite v0.2 has been released.

## New features

### ✨ Mobile main nav

![[syenite-v0.2-mobile-menu.gif|Mobile main nav]]

### ✨ 404s for pages, articles, and tags

Each of these has a personalized `404 Not found` page with links to relevant sections of the site.

![[syenite-v0.2-404-pages.png|404 not found for pages]]

![[syenite-v0.2-404-articles.png| 404 not found for articles]]

![[syenite-v0.2-404-tags.png|404 not found for tags]]

### ✨ "Other articles tagged" component

Now there's a new component at the bottom of each article called "Other articles tagged...". This should help with discoverability.

![[syenite-v0.2-other-articles-tagged.png]]

🤔 A few issues I'm debating are:

- should I limit the list of articles under each tab to, say, 10?
- show the current article in the list (not as a link) or not? This would create multiple entries though, one for each tab. But... it would avoid the scenario where the current article is the only one for a certain tab.

## Improvements

### 🛠 Re-wrote the tags API

The tags API is defined in `src/routes/api/tags/+server.js` and it now powers 2 things: the `/blog/tags` (or `/blog/tags/sometag`) page, as well as the "Other articles tagged..." component.

Originally I had designed the endpoint to be called either

- GET `/api/tags` - for the tags index
- GET `/api/tags/sometag` - for a specific tag

Everything worked fine in dev mode, but when I tried to build for production SvelteKit complained about multiple routes with the same name.

After some experimentation I decided that the best course of action would be to pass the specific tag in a URL query parameter instead of tacking it on to the path. So I ended up with this:

- GET `/api/tags` - for the tags index, no changes here
- GET `/api/tags?tag=sometag` - for a specific tag

Another advantage of this pattern is that down the road it would be very easy to adapt it for filtering by multiple tags instead of just one, so something like this `/api/tags?tag=sometag,anothertag`.

I also disabled prerender in `src/routes/+layout.js` which had previously been `true`. Prerendering doesn't work with URL query parameters. Attempting to `npm run build` throws this error:

```
Error: Cannot access url.searchParams on a page with prerendering enabled
```

The changes combined made everything come together nicely, and the site feels very snappy, even without prerendering.

### 💄 Blog index visual reorg

I reorganized the blog index visually. Probably doesn't matter at this point since this project is meant as a starter that every person should customize to their own preference but whatever 🤷‍♂️

**Before**

![[syenite-v0.2-blog-index-before.png|Blog index before]]

**After**

![[syenite-v0.2-blog-index-after-1.png|Blog index after 1]]

**After** - mobile

![[syenite-v0.2-blog-index-after-2.png|Blog index after - mobile view]]

## Fixes

### 🐞 Fixed images containing `.` in the file name

- If an image (located in `article-vault/_assets`) was named `syenite-v0.2-mobile-menu.gif` it would break the site, as the logic in `src/lib/utils/index.js` would try to split the file name by `.` and lose the middle part in the process.