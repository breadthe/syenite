---
title: Mastodon webmentions as comments
description: Syenite now has support for Mastodon webmentions in lieu of a commenting system
author:
author_url:
mastodon_toot_url: https://indieweb.social/@brbcoding/111381002830455161
image: 
image_credits: 
published: 2023-11-11T07:30
updated:
tags:
  - syenite
  - mastodon
---

One of the trickiest problems to solve with a static blog is a commenting system. By its nature, commenting requires a back-end component and some form of persistence, usually in the form of a database.

I feel like a dynamic blog should offer a way for people to interact with the author. It's probably one of the top reasons holding me back from starting blogs on various subjects, sooner. A dumb reason, at that. Nonetheless, I like interacting with my readership.

This becomes a problem when you're all-in on hosting everything statically for minimal (or zero) cost. There are commenting systems out there that have a free tier or are self-hosted, but there's always a catch. Either you are locked into a specific platform, or you eventually exceed the free quota, or there are privacy implications, or you still need to pay for a self-hosted instance.

So I've been exploring various ways to add comments to a static blog engine without having to self-host or rely on 3rd parties.

One technique that has gained steam since Twitter collapsed into a pile of shit is using [Mastodon webmentions](https://www.codingwithjesse.com/blog/add-mastodon-replies-to-your-blog/) as comments. (Another way is to use GitHub issues, but since I'm aiming the first real-world implementation of this engine at non-developers, the Mastodon option wins for now.)

# The procedure

The article linked above is everything you need to get this working. Nonetheless, I'm documenting the procedure here, specifically in the context of a SvelteKit blog.

## Add the webmention links to the site header

*Showing only the additions, omitting existing code*

In the main layout file I imported `SITE_URL` and `AUTHOR_URL` from the [[config-file|config file]] and stripped out the `http(s)://` part. Then I added these 3 link tags to the site `<head>` element.

`src/routes/+layout.svelte`
```html
<script>
    import { SITE_URL, AUTHOR_URL } from '$lib/config.js'

	const siteUrl = SITE_URL.replace(/^(https?:\/\/)/, '');
</script>

<svelte:head>
    <!-- Mastodon webmentions -->
	<link href={AUTHOR_URL} rel="me">
    <link rel="webmention" href={`https://webmention.io/${siteUrl}/webmention`} />
    <link rel="pingback" href={`https://webmention.io/${siteUrl}/xmlrpc`} />
</svelte:head>
```

In the browser this renders as:

```html
<link href="https://github.com/breadthe" rel="me">
<link rel="webmention" href="https://webmention.io/syenite.vercel.app/webmention">
<link rel="pingback" href="https://webmention.io/syenite.vercel.app/xmlrpc">
```

**Push the changes to production!** The two links must be live in production, otherwise the next step will fail.

## Link the blog URL to your GitHub profile

In GitHub edit your profile and add the site URL `https://syenite.vercel.app/` to either the **website** field, or one of the additional **Social accounts**. In my case, I already had another blog under the main website field.

![[mastodon-webmentions-gh-setup.png|Mastodon webmention.io GitHub setup]]
## Sign in to webmention.io using GitHub

- Open [webmention.io](https://webmention.io/) in the browser.
- Put the site URL in the **Web Sign-in** field and hit **Sign in**

![[mastodon-webmentions-webmentionio-sign-in.png|Mastodon webmentions webmention.io sign in]]

- If everything was setup correctly, you should be redirected to the Settings page https://webmention.io/settings

![[mastodon-webmentions-webmentionio-setup.png|Mastodon mentions webmention.io setup]]

- Notice that it shows the two links I already added to the header. It's fine, we've already done the legwork of adding them to `<head>`.

## Link Mastodon account to brid.gy

Go to [fed.brid.gy](https://fed.brid.gy/) and click on "Cross-post to a Mastodon account" to integrate with your existing Mastodon account. In my case that would be `https://indieweb.social`.

Next it'll ask for your site URL. For me that would be `https://syenite.vercel.app/`.

## Post a link to the article on Mastodon

On Mastodon make a new post which includes the exact link to the article, `https://syenite.vercel.app/2023/11/mastodon-webmentions` in this case. Grab the Mastodon toot URL which looks like this `https://indieweb.social/@brbcoding/111381002830455161`.

Now go back to the article itself and add the URL to the `mastodon_tool_url` frontmatter. Then publish it again. Once people start replaying / favoriting / boosting your toot, they'll start appearing on your article.

The cool thing about this is that you'll be able to see the mentions in your local environment as well (`npm run dev`), so you can easily debug or adjust the design.

## Displaying the webmentions

Now that the blog is wired up with Mastodon it's time to get any mentions via the webmention.io API and display them at the bottom of each article.

![[mastodon-webmentions-displayed.jpg]]

The article page is at `src/routes/[year]/[month]/[slug]/+page.svelte`.

It imports 2 components for Mastodon webmentions:
- `src/components/MastodonShareBtn.svelte` - renders the Mastodon share button.
- `src/components/MastodonWebmention.svelte` - polls the webmention.io API when the component loads, and renders the webmentions. You can certainly make it refresh periodically if needed, but I think that's overkill, so I didn't bother.

## Conclusion

Thanks to [Coding with Jesse](https://www.codingwithjesse.com/) I was able to implement Mastodon webmentions on 2 different blogs. This one was even easier than the first, because most of the plumbing was in place. All I had to do was be very careful wiring things up with the 3rd party services, and convert a couple of Vue components to Svelte.

Unfortunately it's not all roses and butterflies. A couple of people have already pointed out on Mastodon that this type of commenting system has some privacy implications, and now I'm having second thoughts about adding webmentions.

I am torn on this. I love the Mastodon community and chill vibe, and I would like to bring some of that discussion to my blog. It really feels like there's no good option for integrating blog comments that stands head and shoulders above all others.

My plan is to leave support for it built in since I did the work of implementing it, but add a config flag to turn it off if you want. I mean, it's likely that no one but me will use this blog engine but still...



