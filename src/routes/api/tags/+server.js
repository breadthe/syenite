import { fetchMarkdownArticles } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const GET = async ({ url }) => {
    const tag = url.searchParams.get('tag')

    const tags = new Map()

    const allArticles = await fetchMarkdownArticles()

    // sort articles in reverse chronological order
    const sortedArticles = allArticles.sort((a, b) => new Date(b.meta.published) - new Date(a.meta.published))

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
