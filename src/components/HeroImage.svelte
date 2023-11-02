<script>
	import { isUrl } from '$lib/utils/index.js'

	export let image = null
	export let imageCredits = null
	export let title = '' // article title
</script>

{#if image}
	<figure class="w-full">
		<img src={image} alt={title} />

		{#if imageCredits}
			<figcaption class="mt-2 sm:mt-4 text-xs text-center italic">
				Image credits:
				{#if isUrl(imageCredits)}
					<a href={imageCredits} target="_blank">{imageCredits}</a>
				{:else}
					{imageCredits}
				{/if}
			</figcaption>
		{/if}
	</figure>
{/if}
