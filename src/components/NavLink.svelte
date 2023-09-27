<script>
	import { page } from '$app/stores'
	$: isActive = $page.url.pathname === $$props.href

    export let href
</script>

<a {href} class:font-bold={isActive}>
	<slot />
</a>
