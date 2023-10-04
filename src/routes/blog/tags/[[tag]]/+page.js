import { error } from '@sveltejs/kit'

export const load = async ({ fetch, params }) => {
    const { tag } = params
    let serverUrl = `/api/tags`

    if (tag) serverUrl += `?tag=${tag}`

    const response = await fetch(serverUrl)
    const tags = await response.json()

    if (tag && Object.keys(tags).length === 0) {
        throw error(404, `Tag <strong>${tag}</strong> not found`)
    }

    return {
        tags,
        isTagsIndex: tag ? false : true,
        currentTag: tag ? tag : null,
    }
}
