import * as React from "react"
import { fetchImage } from "./fetchImage"
import { ImageList } from "./SmartImage"
import { removeBlankArrayElements, stringToArray } from "./util"

export const useImageWithState = (src: ImageList, hasErrorBoundary?: boolean) => {
    src = removeBlankArrayElements(stringToArray(src))
    const [srcList, setSrcList] = React.useState(src)
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | undefined>()
    const [url, ...nextUrls] = srcList

    React.useEffect(() => {
        fetchImage(url)
            .then(() => {
                setIsLoading(false)
            })
            .catch(e => {
                if (nextUrls.length === 0) {
                    setIsLoading(false)
                    setError(e?.message ?? 'Unable to retrieve any listed images.')
                } else {
                    setSrcList(nextUrls)
                }
            })
    }, [srcList])

    return { url, error, isLoading }
}