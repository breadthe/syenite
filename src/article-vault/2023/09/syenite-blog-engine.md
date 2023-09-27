---
title: Syenite blog engine
description: The how and why behind the Syenite blog engine
author:
author_url:
published: 2023-09-20T14:30
updated: 
tags:
  - syenite
---

## YASBE - Yet another static blog engine?

"But why?" you might ask. The answer is simple, though the journey is arduous.

I've had an idea for a fitness blog for a very long time. Two things stopped me: the inability to find a good (available domain) name, and the right engine.

Because I'm a programmer and a maker, and one is never satisfied with what's already out there, a new blog engine is born. But fear not, young padawan. While the path of the database-backed blog is tempting, the road there is full of perils.

## Who is it aimed at?

Primarily the content creator who is comfortable with `npm` and `git` and deploying to a provider such as Netlify or Vercel. It doesn't hurt to know or be willing to learn Svelte(Kit).

Initially this is not intended specifically for developer blogs, because it's not the first thing I need from it. The reason for that is that code highlighting is not fully supported, nor is it my first priority.

Eventually, I intend to add proper code highlighting, because I would very much like this to be a great dev blog alternative. For now, think of it as a general blog platform for the developer's other hobbies.

## Base requirements

I am very partial to static blogs, to the point where I will twist into pretzels to have one rather than using a database-driven engine.

Static blogs are easy to manage, can (should) use [markdown](https://commonmark.org/), and can be hosted for free.

Over the last 1.5 years I've been using [Obsidian](https://obsidian.md/) intensely for notes, and while they do offer a publishing platform (at a cost), I thought it would be very cool to use it as a back-end for my own blog platform.

So my absolutely-must-have features for a new blog are:

- free & open-source
- static
- self-managed and hosted
- markdown
- write articles with Obsidian

## Platform options

I considered several technologies before landing on the current implementation.

### Laravel Jigsaw

[Jigsaw](https://jigsaw.tighten.com/) is a great option if you live in PHP-land (like me). In fact, I've been running a blog on it for years. It uses markdown, is highly customizable, and it generates a static bundle that you can host for free (mine is deployed on Netlify).

The problem is that I failed to keep it up to date and dependencies kinda fell out of sync, so now I'm afraid to touch it in case the production build breaks. But I don't have a huge reason to fiddle with it either 🤷‍♂️

Another niggle is that it has both PHP and JS dependencies, so there are 2 dependency bundles to stay on top of.

Overall Jigsaw remains a solid choice, and I'm very tempted to make yet another blog on it, with Obsidian support.

### WriteFreely

[WriteFreely](https://writefreely.org/) is a very tempting engine. At one point I was ready to make the plunge. I love how clean and simple it looks, and that it's open-source. The fact that it's written in Go is a blessing (fast) and a curse (I don't know anything about Go, so potentially hard to host/customize).

The problem with this engine is that, while they do offer a self-hosted edition, it means I have to provide my own server, be willing to perform the installation, and manage it afterwards.

Ultimately I decided that the risk of being stuck on an unfamiliar platform that I also have to manage wasn't worth it. I'm "lucky" that I'm already paying for a $5 VPS that I use to host dynamic sites, but others may not want the expense.

### Custom thing made in SvelteKit

The last thing an aspiring blog writer wants to do is build their blog engine. Unless they're a programmer, of course. [SvelteKit](https://kit.svelte.dev/) was released recently and it was at the top of my candidate list.

So I checked what SvelteKit engines were out there, and the one that stands head and shoulders above the rest is [swyxkit](https://github.com/swyxio/swyxkit/). I thought, this is perfect! A couple of snags though. First, swyxkit is opinionated. It fits most of my requirements, but not all. It also has extra things that I don't need. Second, it doesn't have Obsidian support, and I really wanted that.

I did another round of looking around and I came upon this [blog template](https://github.com/franknoirot/obsidian-sveltekit-blog/) by a fellow named [Frank Noirot](https://franknoirot.co/) built on SvelteKit with Obsidian support. It's kinda experimental, but it does exactly what I need.

## The Frankenblog

I followed [this tutorial](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) for a while to get a handle on how a markdown blog works on SvelteKit, after which I decided the best thing to do is to stitch together bits from swyxkit and Frank Noirot's Obdisian technique to get what I want.

Thus was born **Syenite**.

Remember how I said that swyxkit is opinionated? Well, so is Syenite. It's opinionated in my own fashion, of course, but that's the beauty of open-source.

## Why Syenite?

Finally, you might wonder why call it *Syenite*? The reasons keep piling up.

I've been reading [The Broken Earth](https://www.goodreads.com/book/show/38496769-the-broken-earth-trilogy) trilogy by N.K. Jemisin and I really liked the feisty personality of one character named Syenite.

In real life, [Syenite](https://en.wikipedia.org/wiki/Syenite) is an igneous rock similar to granite. I find it beautiful in its simplicity. I want this engine to be simple and solid as a rock (lofty goals, I know).

Incidentally, it doesn't hurt that both syenite and obsidian are volcanic rocks.

Finally, let me hit you with this knowledge: **S**yeni**te** and **S**vel**te** both start with **S** and and in **te** 🤯