<script>
	import DarkModeToggle from './DarkModeToggle.svelte'
	import GitHubLink from './GitHubLink.svelte'
	import NavLink from './NavLink.svelte'
	import MobileMenu from './MobileMenu.svelte'

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Uses', href: '/uses' },
        { name: 'Contact', href: '/contact' },
    ]

</script>

<header class="w-full max-w-4xl mx-auto py-4 sm:py-6 md:py-8">
	<nav class="mx-4 flex flex-wrap justify-between gap-4">
        <MobileMenu {links} />

        <ul class="list-none hidden sm:flex gap-8">
            {#each links as link}
                <li>
                    <NavLink href={link.href}>{link.name}</NavLink>
                </li>
            {/each}
		</ul>

        <div class="flex items-center gap-2">
            <GitHubLink />

            <DarkModeToggle />
        </div>
	</nav>
</header>
