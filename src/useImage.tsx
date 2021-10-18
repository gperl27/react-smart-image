import { ImageList } from "./SmartImage"
import { useImageWithState } from "./useImageWithState"
import { useImageWithSuspense } from "./useImageWithSuspense"

interface UseImageState {
    url: string,
    isLoading?: boolean,
    error?: string
}

export const useImage = (src: ImageList, shouldUseSupense: boolean = true): UseImageState => {
    const useInternalImage = hookFactory(shouldUseSupense)
    return useInternalImage(src)
}

const hookFactory = (shouldUseSupense: boolean) => {
    return shouldUseSupense ? useImageWithSuspense : useImageWithState
}