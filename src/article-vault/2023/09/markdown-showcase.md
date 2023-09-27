---
title: Markdown showcase
description: All the supported markdown symbols, as a means to illustrate and visualize markdown rendering and styling
author: GitHub
author_url: https://github.com
published: 2023-09-29T14:30
updated:
tags:
  - markdown
---

The content between the two pointy hands is a Svelte component 👇

<script>
	import UpdatedAt from "../../../components/UpdatedAt.svelte";
</script>

<UpdatedAt updatedAt="2024-02-02T00:00" />

👆 end of Svelte component

From https://commonmark.org/help/

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Normal paragraph text.

~~Crossed-out text.~~

*Italic text*

**Bold text**

[Commonmark.org - external link](https://commonmark.org/)

[[syenite-blog-engine|Link to another Obsidian doc]]

![[horse-head.png|Horse head image]]

> No good deed goes unpunished - Albert Einstein

Unordered list

* Guns
* and
* Roses

Ordered list

1. One
2. Two
3. Three

Task list

- [ ] todo
- [x] done

Horizontal rule 👇

---

Table 👇

bla | blab | blaba
---|---|---
one | two | three
four | five | six

`Inline code` with backticks...


```php
// code block

$a = 1;
$b = 1;

function add($a, $b)
{
	return $a + $b;
}
```

YouTube embed 👇

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=irL0jY5wqb1niu9u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
