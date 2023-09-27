<script>
	export let linkUrl = '';
	export let linkName = '';
	export let authorUrl = '';
	export let authorName = '';
</script>

<div
	class="grid grid-rows-1 sm:grid-rows-3 text-[--bg-color] text-xl font-extralight"
>
	<div class="p-4 row-span-1 sm:row-span-2 bg-[--bg-color-muted] rounded-tl-xl">
		<a
			href={linkUrl}
			class="border-b border-[--border-color] hover:border-[--text-color] pb-0.5 hover:no-underline"
			>{linkName}</a
		>
	</div>
	<div class="p-4 flex items-end justify-end gap-1 text-sm text-right bg-[--bg-color-muted] rounded-br-xl">
		<span class="border-b border-transparent text-[--text-color] pb-0.5">by</span>
		<a
			href={authorUrl}
			class="border-b border-[--border-color] hover:border-[--text-color] pb-0.5 hover:no-underline"
			>{authorName}</a
		>
	</div>
</div>
