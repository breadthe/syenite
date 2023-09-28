<script>
    import NavLink from './NavLink.svelte'

    export let links = [];

	let isOpen = false;

	let isMenuRendered;
	$: {
		if (isOpen) {
			setTimeout(() => {
				isMenuRendered = true;
			}, 20);
		} else {
			setTimeout(() => {
				isMenuRendered = false;
			}, 300);
		}
	}
</script>

<div class="sm:hidden">
	<button
		class="visible h-full"
		aria-label="Toggle menu"
		type="button"
		on:click={() => (isOpen = !isOpen)}
	>
		{#if !isOpen}
			<svg
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				class="text-[--primary-color]"
			>
				<path d="M0 5.5h15m-15-4h15m-15 8h15m-15 4h15" stroke="currentColor"></path>
			</svg>
		{:else}
			<svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
				class="text-[--primary-color]"
            >
                <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"></path>
            </svg>
		{/if}
	</button>
	{#if isOpen && links.length > 0}
		<ul
			class="menu absolute left-0 z-10 w-full h-screen flex flex-col text-2xl uppercase list-none bg-[--bg-color] opacity-0"
            style="transition: opacity 300ms ease, transform 300ms ease;"
			class:menuRendered={isMenuRendered}
		>
			{#each links as link}
				<li
					class="w-full border-b border-[--border-color] p-4"
					style="transition-delay: 150ms;"
				>
                    <NavLink href={link.href} on:click={() => setTimeout(() => (isOpen = false), 300)}>{link.name}</NavLink>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.menu li {
		transform: translateX(-16px);
		opacity: 0;
		transition:
			opacity 300ms ease,
			transform 300ms ease,
			width 300ms ease,
			border-color 300ms ease;
		width: 0px;
		white-space: nowrap;
	}

	.menuRendered {
		opacity: 1;
	}

	.menuRendered li {
		@apply w-full;
		transform: translateX(0);
		opacity: 1;
	}

	@keyframes grow {
		0% {
			height: 0px;
		}
		100% {
			height: 24px;
		}
	}
</style>
