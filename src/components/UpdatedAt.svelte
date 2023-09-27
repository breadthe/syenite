<script>
	import { prettyDate } from '$lib/utils/index.js';

	export let updatedAt = null;

	const today = new Date();
</script>

<p>
	<strong>Updated:</strong>
	{#if updatedAt}
		{prettyDate(updatedAt)}
	{:else}
		{prettyDate(today)}
	{/if}
</p>
