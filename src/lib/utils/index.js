import { fdir } from 'fdir'
import { convert } from 'html-to-text'

// Transforms Obsidian links and images to relative HTML anchors and image links
export const transformObsidianLinks = ({ content, filename }) => {
    if (!['.svelte.md', '.md', '.svx'].some((extension) => filename.includes(extension)))
        return { code: content }

    const vaultDirectory = '/src/article-vault'
    const assetsDirectory = `${vaultDirectory}/_assets`
    const assetsOutputDirectory = '/assets' // defined in vite.config.ts

    const obsidianImageRegex = /\!\[\[(.+?(\|.+?)?)\]\]([\W])/g
    const obsidianLinkRegex = /\[\[(.+?(\|.+?)?)\]\]([\W])/g
    const externalLinkRegex = /<a\s+(?:[^>]*?\s+)?href=["'](https?:\/\/[^'"]+)["'][^>]*>.*?<\/a>/g
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
            let slug = p1.includes('|') ? p1.slice(0, p1.indexOf('|')) : p1
            let hash = ''

            // Handle links with headings
            if (slug.includes('#')) {
                hash = slug.slice(slug.indexOf('#'))
                slug = slug.slice(0, slug.indexOf('#')) // remove hash from slug

                // Replace non-alphanumeric characters in the hash with dashes
                hash = '#' + hash
                    .slice(1) // ignore the leading '#'
                    .replace(/<\/?code>/g, '') // replace "<code>" or "</code>" with empty string
                    .replace(/[^a-zA-Z0-9]/g, '-') // replace non-alphanumeric characters with dashes
                    .replace(/-{2,}/g, '-') // replace multiple dashes with a single dash
                    .toLowerCase() // lowercase
            }

            const filePathArr = new fdir()
                .glob(`./**/${slug}.md`)
                .withRelativePaths()
                .crawl(`.${vaultDirectory}`)
                .sync()

            const href = `/` + (filePathArr.length === 1) ? filePathArr[0].slice(0, -3) : slug

            const linkText = p2 ? p2.slice(1) : p1

            const linkHtml = `<a href="/${href}${hash}">${linkText}</a>` + p3

            return linkHtml
        })
        // External links open in new tab and have a 🔗 emoji
        .replace(externalLinkRegex, (_, p1, p2, p3) => {
            let linkHtml = _.replace('href="', 'target="_blank" href="')
            linkHtml = linkHtml.replace('</a>', ' 🔗</a>');

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
            const article = await resolver()
            const { metadata } = article

            // transforms /src/article-vault/2021/01/article.md to /2021/01/article
            const articlePath = path.replace('article-vault/', '').slice(4, -3)

            // Extracts HTML, then text from markdown (used in search)
            const articleHtml = article.default.render().html
            const articleText = convert(articleHtml, {
                wordwrap: false,
                selectors: [
                    // { selector: 'a', options: { ignoreHref: true } },
                    // { selector: 'img', format: 'skip' },
                ]
            })

            metadata.content = articleText

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

// checks if a string is a URL
export const isUrl = (string) => {
    try {
        new URL(string)
    } catch (_) {
        return false
    }

    return true
}
