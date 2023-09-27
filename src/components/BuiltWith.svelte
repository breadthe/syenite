<script>
	export let linkUrl = '';
	export let linkName = '';
</script>

<div
	class="px-4 py-2 bg-[--primary-color] rounded-tl-xl rounded-br-xl group"
>
	<a
		href={linkUrl}
		class="text-xl text-[--bg-color] border-b border-transparent group-hover:border-[--bg-color] pb-0.5 group-hover:no-underline"
		>{linkName}</a
	>
</div>
