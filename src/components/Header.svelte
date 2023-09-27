<script>
	import DarkModeToggle from './DarkModeToggle.svelte'
	import GitHubLink from './GitHubLink.svelte'
	import NavLink from './NavLink.svelte'
</script>

<header class="max-w-4xl mx-auto py-4 sm:py-6 md:py-8">
	<nav class="mx-4 flex flex-wrap justify-between gap-4">
		<ul class="list-none flex gap-8">
			<li>
				<NavLink href="/">Home</NavLink>
			</li>
			<li>
				<NavLink href="/blog">Blog</NavLink>
			</li>
			<li>
				<NavLink href="/about">About</NavLink>
			</li>
			<li>
				<NavLink href="/uses">Uses</NavLink>
			</li>
			<li>
				<NavLink href="/contact">Contact</NavLink>
			</li>
		</ul>

        <div class="flex items-center gap-2">
            <GitHubLink />

            <DarkModeToggle />
        </div>
	</nav>
</header>
