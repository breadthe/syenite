import { fetchMarkdownArticles, sortArticles } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const GET = async ({ url }) => {
    const tag = url.searchParams.get('tag')
    const sort_by = url.searchParams.get('sort_by') ?? 'published' // meta.published or meta.updated
    const order = url.searchParams.get('order') ?? 'desc' // asc or desc

    const tags = new Map()

    const allArticles = await fetchMarkdownArticles()

    // sort articles in reverse chronological order
    const sortedArticles = sortArticles(allArticles, sort_by, order);

    // associate each tag with the articles that have it
    const assignArticleToTag = (tag, article) => {
        if (tags.has(tag)) {
            tags.get(tag).push(article)
        } else {
            tags.set(tag, [article])
        }
    }

    if (tag) {
        const filteredArticles = sortedArticles.filter(article => article.meta.tags.includes(tag))

        for (const article of filteredArticles) {
            assignArticleToTag(tag, article)
        }
    } else {
        for (const article of sortedArticles) {
            for (const tag of article.meta.tags) {
                assignArticleToTag(tag, article)
            }
        }
    }

    const sortedTags = new Map([...tags.entries()].sort())

    return json(
        Object.fromEntries(sortedTags), // transform Map to object
    )
}
