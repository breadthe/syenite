<script>
    import { page } from '$app/stores';
</script>

<div class="m-8 p-8 flex flex-col gap-4">
    <h1 class="text-4xl pb-2 font-bold border-b border-[--border-color]">{$page.status}</h1>
    <p class="text-2xl text-[--text-color-muted]">{@html $page.error.message}</p>
    <p class="mt-8">Check out the <a href="/blog/tags">tags index</a> or <a href="/blog">blog index</a> instead.</p>
</div>
