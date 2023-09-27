<script>
    export let centerH1 = false
</script>

<header class="flex flex-col gap-4">
	<h1 class="text-4xl font-bold" class:text-center={centerH1}>
		<slot />
	</h1>

	<slot name="description" />
</header>
