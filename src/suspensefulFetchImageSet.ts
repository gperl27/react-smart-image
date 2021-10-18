import { fetchImage } from "./fetchImage"

type Cache = { [key: string]: string | Error | Promise<any> }

const cache: Cache = {}

// wrapper fn that meets React's suspense contract
// recurses through list of image urls to fetch
export const suspensefulFetchImageSet = (urls: string[]): string => {
    const [url, ...nextUrls] = urls

    if (!cache[url]) {
        const promise = fetchImage(url)

        promise.then((r: string) => {
            cache[url] = r
        }).catch(e => {
            cache[url] = new Error(e)
        })

        cache[url] = promise
    }

    if (cache[url] instanceof Promise) {
        throw cache[url]
    }

    if (cache[url] instanceof Error) {
        if (nextUrls.length === 0) {
            throw cache[url]
        }

        return suspensefulFetchImageSet(nextUrls)
    }


    return cache[url] as string
}
