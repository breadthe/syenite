import { AUTHOR, AUTHOR_URL } from '$lib/config.js'

export async function load({ params, url, fetch }) {
    const post = await import(`../../../../article-vault/${params.year}/${params.month}/${params.slug}.md`)
    const slug = params.slug
    const content = post.default
    const { title, description, author, author_url, published, updated, tags } = post.metadata

    // Build previous and next article links
    const response = await fetch(`/api/articles`)
    const articles = await response.json()

    const currentArticleIndex = articles.findIndex(
        (article) => article.path === url.pathname
    );

    const previousArticle = articles[currentArticleIndex - 1];
    const nextArticle = articles[currentArticleIndex + 1];

    return {
        slug,
        content,
        title,
        description,
        author: author || AUTHOR,
        author_url: author_url || AUTHOR_URL,
        published,
        updated,
        tags,
        path: url.pathname,
        previousArticle,
        nextArticle,
    }
}
