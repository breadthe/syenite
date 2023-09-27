<script>
	export let tags;
</script>

{#if tags}
	<ul class="flex gap-2 list-none m-0">
		{#each tags as tag}
			<li class="text-sm">
                <a href="/blog/tags/{tag}">#{tag}</a>
            </li>
		{/each}
	</ul>
{/if}
