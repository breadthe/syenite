---
title: Config file
description: How to configure global site parameters using the config file
author:
author_url:
published: 2023-09-05T14:30
updated: 
tags:
  - syenite
---

There is a file called `src/lib/config.js` that exports several constants used in various places, in lieu of hardcoding those values.

It goes without saying you shouldn't keep any sensitive information here such as API keys.

These are the supported parameters and their default values.

Parameter | Default value
---|---
SITE_URL | `'https://example.com'`
SITE_TITLE | `'Syenite'`
SITE_DESCRIPTION | `'Blog engine with SvelteKit + Obsidian'`
DEFAULT_OG_IMAGE | `SITE_URL + '/example.jpeg'`
AUTHOR | `'breadthe'`
AUTHOR_URL | `'https://github.com/breadthe'`
AUTHOR_TWITTER_HANDLE  | `''`

You can import any of these parameters in any file with

```js
import { AUTHOR, AUTHOR_URL } from '$lib/config.js'
```
