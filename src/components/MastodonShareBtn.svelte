<script>
    export let pageUrl;
    export let pageDescription;

    /* Generate a share link for the user's Mastodon domain */
    function mastodonShare() {

        // Get the source text
        const src = `${encodeURIComponent(pageDescription)}&amp;url=${encodeURIComponent(pageUrl)}`;

        // Get the Mastodon domain
        const domain = prompt("Enter your Mastodon domain (enable browser pop-ups)", "mastodon.social");

        if (domain === "" || domain == null) {
            return;
        }

        // Build the URL
        const url = "https://" + domain + "/share?text=" + src;
        console.log(url);

        // Open a window on the share page
        window.open(url, '_blank');
    }
</script>

<a
    href="javascript:void(0);"
    on:click={mastodonShare}
    class="social--share--icon bg-mastodon-purple/90 hover:bg-mastodon-purple text-lg text-white text-center hover:no-underline rounded font-mono px-8 py-1"
>Mastodon</a>
