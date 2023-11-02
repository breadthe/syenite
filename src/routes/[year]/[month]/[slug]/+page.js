import { AUTHOR, AUTHOR_URL } from '$lib/config.js'
import { error } from '@sveltejs/kit';

export async function load({ params, url, fetch }) {

    let article = null

    try {
        article = await import(`../../../../article-vault/${params.year}/${params.month}/${params.slug}.md`)
    } catch (e) {
        throw error(404, `Could not find article <strong>${params.slug}</strong>`)
    }

    const slug = params.slug
    const content = article.default
    const { title, description, author, author_url, image, image_credits, published, updated, tags } = article.metadata

    // Build previous and next article links
    const response = await fetch(`/api/articles`)
    const articles = await response.json()

    const currentArticleIndex = articles.findIndex(
        (article) => article.path === url.pathname
    );

    const previousArticle = articles[currentArticleIndex - 1];
    const nextArticle = articles[currentArticleIndex + 1];

    const heroImageUrl = image ? `/assets/${image}` : null

    return {
        slug,
        content,
        title,
        description,
        author: author || AUTHOR,
        author_url: author_url || AUTHOR_URL,
        image: heroImageUrl,
        image_credits,
        published,
        updated,
        tags,
        path: url.pathname,
        previousArticle,
        nextArticle,
    }
}
