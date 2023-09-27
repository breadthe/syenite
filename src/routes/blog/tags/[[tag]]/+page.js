export const load = async ({ fetch, params }) => {
    const tag = params.tag

    const response = await fetch(`/api/articles`)
    const articles = await response.json()

    const tags = new Map()

    let isTagsIndex = false // tells the template if it's the tag index or a specific tag
    let currentTag = null // the tag name if it's a specific tag

    // associate each tag with the articles that have it
    const assignArticleToTag = (tag, article) => {
        if (tags.has(tag)) {
            tags.get(tag).push(article)
        } else {
            tags.set(tag, [article])
        }
    }

    if (tag) {
        const filteredArticles = articles.filter(article => article.meta.tags.includes(tag))

        for (const article of filteredArticles) {
            assignArticleToTag(tag, article)
        }

        isTagsIndex = false
        currentTag = tag
    } else {
        for (const article of articles) {
            for (const tag of article.meta.tags) {
                assignArticleToTag(tag, article)
            }
        }

        isTagsIndex = true
        currentTag = null
    }

    const sortedTags = new Map([...tags.entries()].sort())

    return {
        tags: sortedTags,
        isTagsIndex,
        currentTag
    }
}
