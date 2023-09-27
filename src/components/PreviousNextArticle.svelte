<script>
	export let previous;
	export let next;
</script>

<nav class="flex items-center justify-between">
    <div class="w-1/3 text-left">
        {#if previous}
            <a href={previous.path}>&larr; {previous.meta.title}</a>
        {:else}
            <span>&nbsp;</span>
        {/if}
    </div>

    <div class="w-1/3 text-center">
        <a href="/blog">&uarr; Index</a>
    </div>

    <div class="w-1/3 text-right">
        {#if next}
            <a href={next.path}>{next.meta.title} &rarr;</a>
        {:else}
            <span>&nbsp;</span>
        {/if}
    </div>
</nav>
