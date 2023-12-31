import RSS from 'rss';
import { SITE_TITLE, SITE_URL } from '$lib/config';
import { remark } from 'remark';
import remarkHTML from 'remark-html';

// @see https://github.com/swyxio/swyxkit/blob/main/src/routes/rss.xml/%2Bserver.js
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ fetch }) {
    const feed = new RSS({
        title: SITE_TITLE + ' RSS Feed',
        site_url: SITE_URL,
        feed_url: SITE_URL + '/api/rss.xml'
    });

    const response = await fetch(`/api/articles`)
    const articles = await response.json()

    // strip data-svelte-h attributes from HTML
    const stripDataSvelteH = (htmlString) => {
        const strippedHtml = htmlString.replace(/\s*data-svelte-h="[^"]*"/g, '');

        return strippedHtml;
    }

    articles.forEach((article) => {
        // extract HTML from markdown
        const htmlDescription = remark()
            .use(remarkHTML)
            .processSync(article.meta.description)

        feed.item({
            title: article.meta.title,
            url: SITE_URL + `${article.path}`,
            date: article.meta.published,
            description: htmlDescription.toString(),
            custom_elements: [
                {
                    "content:encoded": {
                        _cdata: stripDataSvelteH(article.content),
                    }
                },
            ],
        });
    });

    // Suggestion (check for correctness before using):
    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Cache-Control': `public, max-age=${86400}`, // 24 hours
            'Content-Type': 'application/rss+xml' // formerly 'application/rss+xml', doesn't seem to render HTML article content well
        }
    })
}
