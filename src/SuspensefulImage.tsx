import * as React from 'react'
import { ReactImageProps } from "./SmartImage"
import { useImageWithSuspense } from "./useImageWithSuspense"

export const SuspensefulImage = (props: ReactImageProps) => {
    const { src, fallback, errorFallback, ...restProps } = props
    const { url } = useImageWithSuspense(src)

    return (
        <img src={url} {...restProps} />
    )
}