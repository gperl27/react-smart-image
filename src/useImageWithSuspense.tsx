import { ImageList } from "./SmartImage"
import { suspensefulFetchImageSet } from "./suspensefulFetchImageSet"
import { removeBlankArrayElements, stringToArray } from "./util"

export const useImageWithSuspense = (src: ImageList) => {
    const srcList = removeBlankArrayElements(stringToArray(src))
    const url = suspensefulFetchImageSet(srcList)

    return { url }
}