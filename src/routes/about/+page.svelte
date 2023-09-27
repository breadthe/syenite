<script>
    import { SITE_TITLE } from '$lib/config.js';
	import Heading from '$components/Heading.svelte';
</script>

<svelte:head>
	<title>About { SITE_TITLE }</title>
	<meta name="description" content={`About ${SITE_TITLE}`} />
</svelte:head>

<Heading>
	About

	<p slot="description">
		Esse ipsum voluptate qui aliqua sunt ipsum duis excepteur aliqua enim irure adipisicing enim.
		Dolore aliquip exercitation excepteur mollit fugiat. Ullamco incididunt pariatur reprehenderit
		do exercitation adipisicing tempor. Voluptate mollit minim ex dolore nisi veniam quis ullamco
		nostrud culpa magna Lorem id. Reprehenderit minim ea elit nostrud sit sunt officia amet sunt
		elit est. Tempor do ut anim ex ea qui aute veniam quis occaecat. Laborum nulla ad magna ea sit
		elit id nulla mollit nulla.
	</p>
</Heading>
