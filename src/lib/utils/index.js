import { fdir } from 'fdir';

// Transforms Obsidian links and images to relative HTML anchors and image links
export const transformObsidianLinks = ({ content, filename }) => {
    if (!['.svelte.md', '.md', '.svx'].some((extension) => filename.includes(extension)))
        return { code: content }

    const vaultDirectory = '/src/article-vault'
    const assetsDirectory = `${vaultDirectory}/_assets`
    const assetsOutputDirectory = '/assets' // defined in vite.config.ts

    const obsidianImageRegex = /\!\[\[(.+?(\|.+?)?)\]\]([\W])/g
    const obsidianLinkRegex = /\[\[(.+?(\|.+?)?)\]\]([\W])/g
    const transformedContent = content
        .replace(obsidianImageRegex, (_, p1, p2, p3) => {
            const imageFilename = p1.includes('|') ? p1.slice(0, p1.indexOf('|')) : p1
            const imageFilenameParts = imageFilename.split('.') // 'syenite-v0.2-mobile-menu.gif' -> ['syenite-v0', '2-mobile-menu', 'gif']
            const extension = imageFilenameParts.pop() // 'gif'
            const slug = imageFilenameParts.join('.') // 'syenite-v0.2-mobile-menu'
            const filePathArr = new fdir()
                .glob(`./**/${slug}.${extension}`)
                .withRelativePaths()
                .crawl(`.${assetsDirectory}`)
                .sync()
            const href =
                `/` + (filePathArr.length === 1) ? filePathArr[0].slice(0, -3) : imageFilename

            const linkText = p2 ? p2.slice(1) : p1

            const linkHtml =
                `<img src="${assetsOutputDirectory}/${href}${extension}" title="${linkText}" alt="${linkText}" />` + p3
            return linkHtml
        })
        .replace(obsidianLinkRegex, (_, p1, p2, p3) => {
            const slug = p1.includes('|') ? p1.slice(0, p1.indexOf('|')) : p1
            const filePathArr = new fdir()
                .glob(`./**/${slug}.md`)
                .withRelativePaths()
                .crawl(`.${vaultDirectory}`)
                .sync()
            const href = `/` + (filePathArr.length === 1) ? filePathArr[0].slice(0, -3) : slug

            const linkText = p2 ? p2.slice(1) : p1

            const linkHtml = `<a href="/${href}">${linkText}</a>` + p3
            return linkHtml
        })

    return {
        code: transformedContent
    }
}

export const fetchMarkdownArticles = async () => {
    const allArticlesFiles = import.meta.glob([
        '/src/article-vault/**/*.md',

        // ignore assets and drafts, see https://vitejs.dev/guide/features.html#negative-patterns
        '!/src/article-vault/_assets/*',
        '!/src/article-vault/_drafts/*',
    ])
    const iterableArticlesFiles = Object.entries(allArticlesFiles)

    const allArticles = await Promise.all(
        iterableArticlesFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver()

            // transforms /src/article-vault/2021/01/article.md to /2021/01/article
            const articlePath = path.replace('article-vault/', '').slice(4, -3)

            return {
                meta: metadata,
                path: articlePath,
            }
        })
    )

    return allArticles
}

// transforms 2023-07-10T00:00 to July 10, 2023
export const prettyDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
