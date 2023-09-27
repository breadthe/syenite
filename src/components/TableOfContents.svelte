<script>
	import { toclink } from '@svelte-put/toc';
	import { hideToc } from '$lib/store';
	import '$css/toc.postcss';

	export let tocStore;
</script>

<nav class="toc">
	{#if Object.values($tocStore.items).length}
		<div class="w-full flex gap-4 items-center justify-between">
			<button on:click={() => hideToc.set(false)}>
                Table of contents

                {#if $hideToc === true}
                    &darr;
                {/if}
            </button>

			{#if $hideToc === false}
				<button on:click={() => hideToc.set(true)}>&times;</button>
			{/if}
		</div>

		<ul class="space-y-1" class:hidden={$hideToc}>
			{#each Object.values($tocStore.items) as tocItem}
				{@const level = tocItem.element.tagName.slice(1)}
				<li>
					<!-- svelte-ignore a11y-missing-content -->
					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- eslint-disable-next-line svelte/valid-compile -->
					<a
						use:toclink={{
							tocItem,
							store: tocStore,
							observe: {
								attribute: 'data-current'
							}
						}}
						class="c-link -ml-px block border-l border-transparent py-1 data-current:border-primary"
						class:pl-3={level === '2'}
						class:pl-5={level === '3'}
						class:pl-7={level === '4'}
						class:pl-9={level === '5'}
						class:pl-11={level === '6'}
					>
						<span>
							{tocItem.text}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>
