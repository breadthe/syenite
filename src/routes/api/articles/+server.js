import { fetchMarkdownArticles } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const GET = async () => {
    const allArticles = await fetchMarkdownArticles()

    const sortedArticles = allArticles.sort((a, b) => {
        return new Date(b.meta.published) - new Date(a.meta.published)
    })

    return json(sortedArticles)
}
