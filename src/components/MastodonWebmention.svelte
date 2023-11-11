<script>
	import { onMount } from 'svelte'
	import { WEBMENTION_IO_API_URL, AUTHOR_MASTODON_SERVER, AUTHOR_MASTODON_HANDLE } from '$lib/config'

	export let pageUrl = '/blog'
	export let mastodonTootUrl = ''

	let link = '' // @todo what is this for?
	let favorites = []
	let boosts = []
	let replies = []

	async function loadWebmentions() {
		if (mastodonTootUrl?.length === 0) return

		let mentions = await getMentions(pageUrl)

		if (mentions.length) {
			link = mentions
				.filter((m) => m.url.startsWith(`${AUTHOR_MASTODON_SERVER}${AUTHOR_MASTODON_HANDLE}`))
				.map(({ url }) => url.split('#')[0])
				.shift()

			favorites = mentions.filter((m) => m['wm-property'] === 'like-of')
			boosts = mentions.filter((m) => m['wm-property'] === 'repost-of')
			replies = mentions.filter((m) => m['wm-property'] === 'in-reply-to')
		}
	}

	async function getMentions(pageUrl) {
		let mentions = []
		let page = 0
		const perPage = 100

		while (true) {
			const results = await fetch(`${WEBMENTION_IO_API_URL}?target=${pageUrl}&per-page=${perPage}&page=${page}`).then(
				(r) => r.json()
			)

			mentions = mentions.concat(results.children)

			if (results.children.length < perPage) {
				break
			}

			page++
		}

		return mentions.sort((a, b) => ((a.published || a['wm-received']) < (b.published || b['wm-received']) ? -1 : 1))
	}

	function authorUrlToMastodonUrl(url) {
		const parts = url.split('/')
		return `${parts[3]}@${parts[2]}`
	}

	onMount(() => {
		loadWebmentions()
	})
</script>

{#if mastodonTootUrl?.length || replies.length || boosts.length || favorites.length}
	<div class="my-4 flex flex-col gap-4">
		{#if mastodonTootUrl?.length}
			<a
				href={mastodonTootUrl}
				class="w-full p-2 text-center text-xl text-mastodon-purple hover:text-white bg-indigo-100 hover:bg-mastodon-purple rounded font-bold"
				target="_blank"
			>
				Discuss this article on Mastodon
			</a>
		{/if}

		{#if replies.length}
			<h6 class="mb-2 text-xl text-mastodon-purple font-bold">Replies</h6>

			<div class="flex flex-col gap-2">
				{#each replies as reply (reply.url)}
					<div class="p-2 border-2 border-mastodon-purple rounded">
						<a
							href={reply.author.url}
							class="flex gap-2 items-center text-base text-mastodon-purple font-bold group"
							target="_blank"
						>
							<img src={reply.author.photo} alt={reply.author.name} class="w-16 rounded-lg" />

							<div class="flex flex-col">
								<span class="font-normal group-hover:text-mastodon-purple group-hover:underline"
									>{reply.author.name}</span
								>
								<span class="text-sm text-gray-600 font-light">{authorUrlToMastodonUrl(reply.author.url)}</span>
							</div>
						</a>

						<div class="mt-2 text-gray-900 text-sm font-light">
							<p class="text-black">{reply.content.text}</p>

							<a
								href={reply.url}
								target="_blank"
								class="block -mt-4 text-right text-mastodon-purple hover:text-mastodon-purple hover:underline">Reply</a
							>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		{#if boosts.length}
			<h6 class="mb-2 text-xl text-mastodon-purple font-bold">Boosted</h6>

			<div class="flex flex-wrap gap-2">
				{#each boosts as boost (boost.url)}
					<a href={boost.author.url} target="_blank">
						<img src={boost.author.photo} alt={boost.author.name} class="w-16 rounded-lg" />
					</a>
				{/each}
			</div>
		{/if}

		{#if favorites.length}
			<h6 class="mb-2 text-xl text-mastodon-purple font-bold">Favorited</h6>

			<div class="flex flex-wrap gap-2">
				{#each favorites as favorite (favorite.url)}
					<a href={favorite.author.url} target="_blank">
						<img src={favorite.author.photo} alt={favorite.author.name} class="w-16 rounded-lg" />
					</a>
				{/each}
			</div>
		{/if}
	</div>
{/if}
