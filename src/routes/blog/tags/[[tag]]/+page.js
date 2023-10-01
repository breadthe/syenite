export const load = async ({ fetch, params }) => {
    const { tag } = params
    let serverUrl = `/api/tags`

    if (tag) serverUrl += `/${tag}`

    const response = await fetch(serverUrl)
    const tags = await response.json()

    return {
        tags,
        isTagsIndex: tag ? false : true,
        currentTag: tag ? tag : null,
    }
}
