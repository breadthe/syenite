<script>
    import { page } from '$app/stores';
</script>

<div class="m-8 p-8 flex flex-col gap-4">
    <h1 class="text-4xl pb-2 font-bold border-b border-[--border-color]">{$page.status}</h1>
    <p class="text-2xl text-[--text-color-muted]">{@html $page.error.message}</p>
    <p class="mt-8">Try these links instead:</p>
    <ul class="">
        <li class=""><a href="/">Home</a></li>
        <li class=""><a href="/blog">Blog</a></li>
    </ul>
</div>
